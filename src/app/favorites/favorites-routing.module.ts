import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaFavoritosComponent } from './lista-favoritos/lista-favoritos.component';


const routes: Routes = [
  {
    path: '',
    component: ListaFavoritosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesRoutingModule { }
