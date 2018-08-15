import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserList } from '../models/userlist';
import { User } from '../models/user';
import { Repo } from '../models/repo';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = '/api/users/';

  constructor(private http: HttpClient) {
  
  }

  getList(pageIndex = 0, pageSize = 15) {
    const since = pageIndex * pageSize;
    return this.http.get<UserList>(`${this.url}?since=${since}`);
  }

  getByUsername(username: string) {
    console.log('getByUsername', username);
    return this.http.get<User>(`${this.url}${username}/details`);
  }

  getReposByUsername(username: string) {
    console.log('getReposByUsername', username);
    return this.http.get<Repo[]>(`${this.url}${username}/repos`);
  }
}
