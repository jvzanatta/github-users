import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  public user$: Observable<User>;
  username: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getUser();
  }

  /**
   * Get the user's login and calls the API to get his data
   */
  private getUser() {
    this.username = this.route.snapshot.params['username'];
    this.user$ = this.userService.getByUsername(this.username);
  }

}
