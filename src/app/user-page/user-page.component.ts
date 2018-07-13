import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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

  private getUser() {
    this.username = this.route.snapshot.params['username'];
    this.user$ = this.userService.getByUsername(this.username);

    // this.user$ = this.route.paramMap.pipe(
    //   switchMap(
    //     (params: ParamMap) => this.userService.getByUsername(params.get('username'))
    //   )
    // );
  }

}
