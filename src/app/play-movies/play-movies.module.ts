import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { PlayMoviesRoutingModule } from './play-movies-routing.module';
import { PlaysComponent } from './plays/plays.component';
import { LimiterCaracterPipe } from '../pipes/limiter-caracter.pipe';


@NgModule({
  declarations: [
    PlaysComponent,
    LimiterCaracterPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    PlayMoviesRoutingModule
  ]
})
export class PlayMoviesModule { }
