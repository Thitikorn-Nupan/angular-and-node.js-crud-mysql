import {Component, NgZone} from '@angular/core';
import {Tutorial} from "../../entity/tutorial";
import {TutorialHttpService} from "../service/tutorial-http.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-tutorial-form',
  templateUrl: './tutorial-form.component.html',
  styleUrls: ['./tutorial-form.component.css']
})
export class TutorialFormComponent {
  private _description = 'Tutorial form'
  private _confirm! : boolean
  private serviceHttp : TutorialHttpService
  private ngZone : NgZone
  private router : Router

  constructor(serviceHttp : TutorialHttpService , ngZone : NgZone , router : Router) {
    this.serviceHttp = serviceHttp
    this.ngZone = ngZone
    this.router = router
  }

  protected onSubmit(tutorial : Tutorial ) {
    if (!this._confirm) {
      window.confirm('Pleases , click I confirm')
    }
    else {
      this.serviceHttp.create(tutorial).subscribe(
        (response : any) => {
          if (response != null) {
            this.ngZone.run(() => (this.router.navigateByUrl('list')))
          }
      })
    }

  }

  set confirm(value: boolean) {
    this._confirm = value;
  }

  get confirm() {
    return  this._confirm
  }

  get description(): string {
    return this._description;
  }
}
