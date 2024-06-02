import { Routes } from '@angular/router';
import { CategoryListComponent } from './domains/notice/category-list/category-list.component';
import { ManagerListComponent } from './domains/manager/manager-list/manager-list.component';

export const routes: Routes = [
  {path:'',title:'categorias',component:CategoryListComponent},
  {path:'managers',title:'managers',component:ManagerListComponent},
];
