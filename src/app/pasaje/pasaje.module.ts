import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasajePageRoutingModule } from './pasaje-routing.module';

import { PasajePage } from './pasaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasajePageRoutingModule
  ],
  declarations: [PasajePage]
})
export class PasajePageModule {}
