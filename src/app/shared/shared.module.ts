import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  exports: [
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class SharedModule { }
