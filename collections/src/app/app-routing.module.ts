import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'collection-detail',
    loadChildren: () => import('./modals/collection-detail/collection-detail.module').then( m => m.CollectionDetailPageModule)
  },  {
    path: 'collection-create',
    loadChildren: () => import('./modals/collection-create/collection-create.module').then( m => m.CollectionCreatePageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
