import {Component, OnInit} from '@angular/core';
import {Tutorial} from "../../entity/tutorial";
import {TutorialHttpService} from "../service/tutorial-http.service";

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.css']
})
export class TutorialListComponent implements OnInit {

  private declare _tutorials : Tutorial []
  private readonly _description = 'Tutorial List'
  private readonly serviceHttp : TutorialHttpService

  constructor(serviceHttp : TutorialHttpService) {
    this.serviceHttp = serviceHttp
  }

  ngOnInit(): void {
    this.loadData()
  }

  private loadData() {
    this.serviceHttp.reads().subscribe((response : any) => (this._tutorials = response.data)); // any attribute in Tutorial should have same field on database
  }

  protected getPropName() {
    if (this._tutorials[0]) {
      let props = Object.keys(this._tutorials[0])
      return props.map((prop) => {
        if (prop.length === 0) {
          return ''; // Handle empty strings
        }
        return prop.charAt(0).toUpperCase() + prop.slice(1);
      })
    }
    else {
      return ['Null', 'Null','Null','Null'];
    }
  }

  protected onDeleteClick(tid : any , index : number) {
    if (window.confirm('Are you sure for cleaning tid '+tid+' ?')) { // if true
      this.serviceHttp.delete(tid).subscribe(
        (response : any) => {
          if (response.status === 'ok') {
            // splice() method changes the content of an array,
            // and syntax
            // array.splice(index, howMany, [element1][, ..., elementN]);
            // index − Index at which to start changing the array.
            // howMany - An integer indicating the number of old array elements to remove. If howMany is 0, no elements are removed.
            this._tutorials.splice(index,1)
          }
        })
    }
  }

  protected onDeleteAllClick() {
    if (window.confirm('Are you sure for cleaning all ?')) {
      this.serviceHttp.deleteAll().subscribe(
        (response : any) => {
          if (response.status === 'ok') {
            this._tutorials.splice(0,this._tutorials.length)
          }
        })
    }
  }

  protected get tutorials(): Tutorial[] {
    return this._tutorials;
  }
  protected get description(): string {
    return this._description;
  }
}
