import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerPageRoutingModule } from './banner-page-routing.module';
import { BannerPageComponent } from './banner-page.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './units/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BannerPageComponent,
    LoginComponent,
    HomeComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    BannerPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BannerPageModule { }
