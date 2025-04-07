import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FoodComponent } from './food/food.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full'
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'food/:type/:id', 
    component: FoodComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: '**', 
    redirectTo: 'login' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
