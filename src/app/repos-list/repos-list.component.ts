import { Component, OnInit, Input } from '@angular/core';
import { ReposListDataSource } from './repos-list-datasource';

import { UserService } from '../services/user.service';
@Component({
  selector: 'repos-list',
  templateUrl: './repos-list.component.html',
  styleUrls: ['./repos-list.component.css']
})
export class ReposListComponent implements OnInit {
  @Input() username: string;

  dataSource: ReposListDataSource;
  displayedColumns = ['id', 'name', 'html_url'];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    console.log('repo list component');
    this.dataSource = new ReposListDataSource(this.userService);
    this.dataSource.loadRepos(this.username);
  }
}
