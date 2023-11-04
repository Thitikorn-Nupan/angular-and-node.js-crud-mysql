import {Component, NgZone, OnInit} from '@angular/core';
import {Tutorial} from "../../entity/tutorial";
import {TutorialHttpService} from "../service/tutorial-http.service";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-tutorial-edit',
  templateUrl: './tutorial-edit.component.html',
  styleUrls: ['./tutorial-edit.component.css']
})
export class TutorialEditComponent implements OnInit {
  private _description = 'Tutorial form edit'
  private serviceHttp : TutorialHttpService
  // for redirect to path /lists
  private ngZone : NgZone
  private router : Router
  private activatedRoute: ActivatedRoute // for retrieve params on path that sent by get method
  private _tutorial :  Tutorial
  private _confirm! : boolean
  constructor(serviceHttp : TutorialHttpService , activatedRoute: ActivatedRoute ,  ngZone : NgZone , router : Router) {
    // console.log(this.tutorial)
    this._tutorial = new Tutorial()
    this.serviceHttp = serviceHttp
    this.activatedRoute = activatedRoute
    this.ngZone = ngZone
    this.router = router
    /*this._tutorial.tid = 1101
    this._tutorial.title = 'Java & Spring'
    this._tutorial.description = 'This was great book that I ever read'
    this._tutorial.published = false
    this._confirm = false*/
  }

  ngOnInit(): void {
    this.serviceHttp.read(this.activatedRoute.snapshot.paramMap.get('tid')).subscribe((response : any) => {
      try {
        /*console.log('old data')
        console.log(response.data[0])*/
        // why have to specify index ?
        // because I use finAll(where tid) [it returns more than one if it has]
        this._tutorial.tid = response.data[0].tid
        this._tutorial.title = response.data[0].title
        this._tutorial.description = response.data[0].description
        this._tutorial.published = response.data[0].published

      } catch (error) {
        // console.log(error)
        // this.ngZone.run(() => {
        //   this.router.navigateByUrl('/lists')
        // })
        throw error
      }
    })
  }

  // setter for set [(ngModel)]=""
  set title(value : string) {
    this.tutorial.title = value
  }
  set description(value : string) {
    this.tutorial.description = value
  }
  set published(value : boolean) {
    this.tutorial.published = value
  }
  set confirm(value: boolean) {
    this._confirm = value;
  }

  // for showing tid from my rest aoi
  get tutorial(): Tutorial {
    // can access tutorial.tid
    return this._tutorial;
  }
  getDescription(): string {
    return this._description;
  }

  onSubmit() {
    if (!this._confirm) {
      window.confirm('Pleases , click I confirm')
    }  else  {
      /*console.log('new data')
      console.log(this._tutorial)*/
      this.serviceHttp.update(this._tutorial).subscribe(
        (response : any) => {
          console.log(response.data)
          if (response.data === true) {
            this.ngZone.run(() => {
              this.router.navigateByUrl('list')
            })
          } else {
            // update failed
            console.log(response)
            this.ngZone.run(() => {
              this.router.navigateByUrl('list')
            })
          }
        })
    }
  }

}
