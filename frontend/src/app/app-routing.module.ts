import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllGroceryListsComponent } from './all-grocery-lists/all-grocery-lists.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { CreateNewListComponent } from './create-new-list/create-new-list.component';

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
