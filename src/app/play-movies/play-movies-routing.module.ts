import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaysComponent } from './plays/plays.component';


const routes: Routes = [
  { path: '', component: PlaysComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayMoviesRoutingModule { }
