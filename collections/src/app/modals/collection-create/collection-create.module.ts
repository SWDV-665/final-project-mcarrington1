import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectionCreatePageRoutingModule } from './collection-create-routing.module';

import { CollectionCreatePage } from './collection-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectionCreatePageRoutingModule
  ],
  declarations: [CollectionCreatePage]
})
export class CollectionCreatePageModule {}
