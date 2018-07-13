import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UsersListDataSource } from './users-list-datasource';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UsersListDataSource;

  displayedColumns = ['id', 'name'];

  public loading: boolean;

  constructor() {
    this.setLoading();
  }

  ngOnInit() {
    this.dataSource = new UsersListDataSource(this.paginator, this.sort);
  }

  private setLoading(status: boolean = false) {
    this.loading = status;
  }
}
