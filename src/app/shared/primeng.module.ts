import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';

@NgModule({
  declarations: [],
  imports: [
    InputTextModule,
    PasswordModule,
    MenubarModule,
    ButtonModule,
    StyleClassModule,
  ],
  providers: [],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    PasswordModule,
    MenubarModule,
    ButtonModule,
    StyleClassModule,
  ],
})
export class PrimeNgModule {}
