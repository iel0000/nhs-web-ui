import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuitemComponent } from './layout/menuitem/menuitem.component';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LayoutComponent } from '../shared/layout/layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrimeNgModule } from './primeng.module';
import { MenuComponent } from './layout/menu/menu.component';
import { TableComponent } from './component/table/table.component';

@NgModule({
  declarations: [
    MenuitemComponent,
    TopbarComponent,
    MenuComponent,
    SidebarComponent,
    LayoutComponent,
    TableComponent,
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
    MenuComponent,
    MenuitemComponent,
    TableComponent,
  ],
})
export class SharedModule {}
