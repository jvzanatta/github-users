import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule,
  MatPaginatorModule, MatSortModule } from '@angular/material';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UsersListComponent } from './users-list/users-list.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ReposListComponent } from './repos-list/repos-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    UsersListComponent,
    UserPageComponent,
    ReposListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    HttpClientModule,
    HttpModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    HttpClientModule,
    HttpModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
