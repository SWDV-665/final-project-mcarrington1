import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionCreatePage } from './collection-create.page';

const routes: Routes = [
  {
    path: '',
    component: CollectionCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionCreatePageRoutingModule {}
