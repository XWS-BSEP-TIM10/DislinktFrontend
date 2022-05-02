import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponentComponent } from './front-page-component/front-page-component.component';

const routes: Routes = [{path:'', component: FrontPageComponentComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
