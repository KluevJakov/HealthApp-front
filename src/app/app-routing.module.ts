import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './blocks/index/index.component';
import { MenuComponent } from './blocks/menu/menu.component';
import { AuthService } from './auth.service';

const routes: Routes = [
  {path: 'menu', component: MenuComponent, canActivate:[AuthService]},
  {path: '', component: IndexComponent},
  {path: "**", redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
