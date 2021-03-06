import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginModule ) },
  { 
    path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomeModule ),
    canActivate: [AuthGuard]
  },
  { 
    path: 'plays', loadChildren: () => import('./play-movies/play-movies.module').then( m => m.PlayMoviesModule ),
    canActivate: [AuthGuard]
  },
  { 
    path: 'favorites', loadChildren: () => import('./favorites/favorites.module').then( m => m.FavoritesModule ),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
