import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  public loading: boolean;

  constructor() {
    this.setLoading();
  }

  ngOnInit() {
  }

  private setLoading(status: boolean = false) {
    this.loading = status;
  }
}
