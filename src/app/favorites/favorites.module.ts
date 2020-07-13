import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { ListaFavoritosComponent } from './lista-favoritos/lista-favoritos.component';


@NgModule({
  declarations: [ListaFavoritosComponent],
  imports: [
    CommonModule,
    FavoritesRoutingModule
  ]
})
export class FavoritesModule { }
