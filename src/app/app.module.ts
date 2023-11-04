import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TutorialHomeComponent } from './components/tutorial-home/tutorial-home.component';
import { TutorialListComponent } from './components/tutorial-list/tutorial-list.component';
import { TutorialEditComponent } from './components/tutorial-edit/tutorial-edit.component';
import { TutorialFormComponent } from './components/tutorial-form/tutorial-form.component';
import { ErrorIntercept} from "./components/handler/error.interceptor";
import { NgOptimizedImage } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TutorialHomeComponent,
    TutorialListComponent,
    TutorialFormComponent,
    TutorialEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage ,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    /* when http has error ErrorIntercept class will work*/
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    }
    ],
  bootstrap: [AppComponent]
})
class AppModule { }

export {
  AppModule
}
