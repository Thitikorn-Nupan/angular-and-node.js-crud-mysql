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
  private serviceHttp: TutorialHttpService
  // for redirect to path /lists
  private ngZone: NgZone
  private router: Router
  private activatedRoute: ActivatedRoute // for retrieve params on path that sent by get method
  private _tutorial: Tutorial
  private _confirm!: boolean

  constructor(serviceHttp: TutorialHttpService, activatedRoute: ActivatedRoute, ngZone: NgZone, router: Router) {
    this._tutorial = new Tutorial()
    this.serviceHttp = serviceHttp
    this.activatedRoute = activatedRoute
    this.ngZone = ngZone
    this.router = router
  }

  ngOnInit(): void {
    this.serviceHttp.read(this.activatedRoute.snapshot.paramMap.get('tid')).subscribe((response: any) => {
      try {
        this._tutorial.tid = response.data[0].tid
        this._tutorial.title = response.data[0].title
        this._tutorial.description = response.data[0].description
        this._tutorial.published = response.data[0].published
      } catch (error) {
        throw error
      }
    })
  }

  // setter for set [(ngModel)]=""
  set title(value: string) {
    this.tutorial.title = value
  }

  set description(value: string) {
    this.tutorial.description = value
  }

  set published(value: boolean) {
    this.tutorial.published = value
  }

  set confirm(value: boolean) {
    this._confirm = value;
  }

  get confirm() {
    return this._confirm
  }

  // for showing tid from my rest aoi // can access tutorial.tid
  get tutorial(): Tutorial {
    return this._tutorial;
  }

  protected getDescription(): string {
    return this._description;
  }

  protected onSubmit() {
    if (!this._confirm) {
      window.confirm('Pleases , click I confirm')
    } else {
      this.serviceHttp.update(this._tutorial).subscribe(
        (response: any) => {
          if (response.status === 'ok') {
            this.ngZone.run(() => (this.router.navigateByUrl('list')))
          }
        })
    }
  }

}
