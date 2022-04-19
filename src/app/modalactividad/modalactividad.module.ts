import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalactividadPageRoutingModule } from './modalactividad-routing.module';

import { ModalactividadPage } from './modalactividad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalactividadPageRoutingModule
  ],
  declarations: [ModalactividadPage]
})
export class ModalactividadPageModule {}
