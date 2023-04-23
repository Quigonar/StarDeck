import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LbdModule } from '../../lbd/lbd.module';

import { FirstLoginLayoutRoutes } from './first-login-layout.routing';
import { FirstLoginComponent } from 'app/login/first-login/first-login.component';
import { ChooseCardComponent } from 'app/login/choose-card/choose-card.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FirstLoginLayoutRoutes),
    FormsModule,
    LbdModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FirstLoginComponent,
    ChooseCardComponent
  ],
  providers: [
  ],
})
export class FirstLoginLayoutModule {}
