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
  showFirstLastButtons: boolean;
  dataSource: UsersListDataSource;
  totalUsers: number;
  pageSize: number;
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

  loadUsersPage() {
    this.dataSource.loadUsers(this.paginator.pageIndex);
  }

  setPageSize() {
    this.pageSize = 15;
  }

  setPaginatorLength() {
    this.totalUsers = 41187958; // GitHub's API does not provide total users to work with Angular Material Pagination
  }

  setFirstLastButtons() {
    this.showFirstLastButtons = true;
  }

}
