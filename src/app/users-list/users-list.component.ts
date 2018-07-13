import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { tap } from 'rxjs/operators';

import { UsersListDataSource } from './users-list-datasource';
import { UserService } from '../services/user.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  /** Where the first and last buttons from paginator will be displayed */
  showFirstLastButtons: boolean;
  /** The datasource to the table */
  dataSource: UsersListDataSource;
  /** The total amount of users (estimated) */
  totalUsers: number;
  /** The number of itens per page */
  pageSize: number;
  /** The columns to be displayed */
  displayedColumns = ['id', 'login'];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.dataSource = new UsersListDataSource(this.userService);
    this.dataSource.loadUsers(0);
    this.setFirstLastButtons();
    this.setPaginatorLength();
    this.setPageSize();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
          tap(() => this.loadUsersPage())
      )
      .subscribe();
  }

  /**
   * Calls the API to get users passing the page's index
   */
  loadUsersPage() {
    this.dataSource.loadUsers(this.paginator.pageIndex);
  }

  /**
   * Sets the amount of itens per page
   */
  setPageSize() {
    this.pageSize = 15;
  }

  /**
   * Sets the aprox total of users since GitHub does not provide it
   */
  setPaginatorLength() {
    this.totalUsers = 41187958; // GitHub's API does not provide total users to work with Angular Material Pagination
  }

  /**
   * Sets wheter the first and last buttons from paginator will be displayed
   */
  setFirstLastButtons() {
    this.showFirstLastButtons = true;
  }

}
