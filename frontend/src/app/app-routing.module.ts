import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroceryListComponent } from './grocery-lists/grocery-list/grocery-list.component';
import { AllGroceryListsComponent } from './grocery-lists/all-grocery-lists/all-grocery-lists.component';
import { CreateNewListComponent } from './grocery-lists/create-new-list/create-new-list.component';

const routes: Routes = [
  {
    path: 'my-lists',
    component: AllGroceryListsComponent,
  },
  {
    path: 'list/:id',
    component: GroceryListComponent,
  },
  {
    path: '',
    redirectTo: '/my-lists',
    pathMatch: 'full',
  },
  {
    path: 'new-list',
    component: CreateNewListComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
