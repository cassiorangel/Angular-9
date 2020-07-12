import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PlayMoviesRoutingModule } from './play-movies-routing.module';
import { PlaysComponent } from './plays/plays.component';


@NgModule({
  declarations: [PlaysComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PlayMoviesRoutingModule
  ]
})
export class PlayMoviesModule { }
