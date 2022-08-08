import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMenuComponent } from './layout/menuitem/menu.component';
import { AppMenuitemComponent } from './layout/menuitem/menuitem.component';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LayoutComponent } from '../shared/layout/layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrimeNgModule } from './primeng.module';

@NgModule({
  declarations: [
    AppMenuitemComponent,
    TopbarComponent,
    AppMenuComponent,
    SidebarComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    PrimeNgModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
  providers: [],
  exports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    PrimeNgModule,
    LayoutComponent,
  ],
})
export class SharedModule {}
