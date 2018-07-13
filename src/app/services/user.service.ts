import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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
  private url = this.router.url.replace('4200', '8080') + '/api/users/'  ;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  getList(since: number = 0) {
    return this.http.get<User[]>(`${this.url}?since=${since}`);
  }

  getByUsername(username: string) {
    return this.http.get<User>(`${this.url}/${username}/details`);
  }

  getReposByUsername(username: string) {
    return this.http.get<Repo[]>(`${this.url}/${username}/repos`);
  }
}
