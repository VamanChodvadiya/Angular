import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api'
import { DataService } from './helper/data.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
BrowserAnimationsModule,
ToastrModule.forRoot(),
NgbModule,
ReactiveFormsModule,
HttpClientModule,
HttpClientInMemoryWebApiModule.forRoot(DataService),
// HttpClientInMemoryWebApiModule.forRoot(EmpDetailService)

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
