import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { TokenInterceptorService } from './auth/token-interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [AuthService,AuthGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
