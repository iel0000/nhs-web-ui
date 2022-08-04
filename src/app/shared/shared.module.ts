import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrimeNgModule } from '@shared/primeng.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [BrowserModule, FontAwesomeModule, PrimeNgModule],
  providers: [],
  exports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    PrimeNgModule,
    NavbarComponent,
  ],
})
export class SharedModule {}
