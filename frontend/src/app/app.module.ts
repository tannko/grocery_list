import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { AllGroceryListsComponent } from './all-grocery-lists/all-grocery-lists.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CreateNewListComponent } from './create-new-list/create-new-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { EditListItemComponent } from './edit-list-item/edit-list-item.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    GroceryListComponent,
    AllGroceryListsComponent,
    CreateNewListComponent,
    EditListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
