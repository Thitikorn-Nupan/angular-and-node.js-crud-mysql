import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TutorialHomeComponent} from "./components/tutorial-home/tutorial-home.component";
import {TutorialListComponent} from "./components/tutorial-list/tutorial-list.component";
import {TutorialFormComponent} from "./components/tutorial-form/tutorial-form.component";
import {TutorialEditComponent} from "./components/tutorial-edit/tutorial-edit.component";

const routes: Routes = [
  {path: '' , redirectTo : 'home' , pathMatch: 'full'} ,  // redirectTo sets home as the redirection path if the actual path matches empty string.
  {path: 'home' , component : TutorialHomeComponent} ,
  {path: 'list' , component : TutorialListComponent} ,
  {path: 'form' , component : TutorialFormComponent} ,
  {path: 'edit/:tid' , component : TutorialEditComponent} ,
  {path: '**' , component : TutorialHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
