import {Component, OnInit} from '@angular/core';
import {Tutorial} from "../../entity/tutorial";
import {TutorialHttpService} from "../service/tutorial-http.service";
@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.css']
})
export class TutorialListComponent implements OnInit {

  private _tutorials : Tutorial []
  private readonly _description = 'Tutorial List'
  private serviceHttp : TutorialHttpService
  constructor(serviceHttp : TutorialHttpService) {
    this._tutorials = new Array<Tutorial>()
    this.serviceHttp = serviceHttp
    /*let t2 = new Tutorial()
    t2.tid = 1102
    t2.title = 'Android & Kotlin'
    t2.description = 'Nice!'
    t2.published = true
    this._tutorials = new Array<Tutorial>(); // this way is creating array type Tutorial
    this._tutorials.push(t2,t2,t2)*/
  }

  ngOnInit(): void {
    this.serviceHttp.reads().subscribe(
      (response : any) => {
        // console.log(response) // it returns the same object that I set on res.json({...}) in my back-end
        // any attribute in Tutorial should have same field on database
        this._tutorials = response.data
      });
  }
  onClick(tid : any , index : number) {
    if (window.confirm('Are you sure for cleaning tid '+tid+' ?')) { // if true
      this.serviceHttp.delete(tid).subscribe(
        (response : any) => {
          console.log(response)
          // splice() method changes the content of an array,
          // and syntax
          // array.splice(index, howMany, [element1][, ..., elementN]);
          // index − Index at which to start changing the array.
          // howMany - An integer indicating the number of old array elements to remove. If howMany is 0, no elements are removed.
          this._tutorials.splice(index,1)
        })
    }
  }

  onClickSecond() {
    if (window.confirm('Are you sure for cleaning all ?')) {
      this.serviceHttp.deleteAll().subscribe(
        (response : any)=> {
          console.log(response) // if req it's success {status: 'ok', data: true}
          this._tutorials.splice(0,this._tutorials.length)
        })
    }
  }
  get tutorials(): Tutorial[] {
    return this._tutorials;
  }
  get description(): string {
    return this._description;
  }
}
