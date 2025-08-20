import { Component } from '@angular/core';

@Component({
  selector: 'app-tutorial-home',
  templateUrl: './tutorial-home.component.html',
  styleUrls: ['./tutorial-home.component.css']
})
export class TutorialHomeComponent {

  private readonly _description = 'git : Thitikorn Nupan'
  private readonly _subDescription = 'Mobile app developer - Web developer - Back-end developer - Front-end developer - Full-stack developer'
  private readonly _icon ='assets/image/avataaars.svg'

  get description(): string {
    return this._description;
  }

  get subDescription(): string {
    return this._subDescription;
  }

  get icon(): string {
    return this._icon;
  }

}
