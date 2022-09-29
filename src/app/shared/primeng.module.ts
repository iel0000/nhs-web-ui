import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { SidebarModule } from 'primeng/sidebar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { AvatarModule } from 'primeng/avatar';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [],
  imports: [
    InputTextModule,
    PasswordModule,
    MenubarModule,
    ButtonModule,
    StyleClassModule,
    SidebarModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule,
    AvatarModule,
    CalendarModule,
    CheckboxModule,
    MultiSelectModule,
    DropdownModule,
    StepsModule,
    CardModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    ToolbarModule,
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    PasswordModule,
    MenubarModule,
    ButtonModule,
    StyleClassModule,
    AvatarGroupModule,
    BadgeModule,
    AvatarModule,
    CalendarModule,
    CheckboxModule,
    MultiSelectModule,
    DropdownModule,
    StepsModule,
    CardModule,
    InputMaskModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    ToolbarModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class PrimeNgModule {}
