import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  protected routerLinks : { key : string , value : string }[] = [
    { key : 'home' , value:'Home'},
    { key : 'list' , value:'Tutorial List'},
    { key : 'form' , value:'Tutorial Form'},
  ]
}
