import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { map, catchError, finalize } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { UserService } from '../services/user.service';
import { UserList } from '../models/userlist';
import { User } from '../models/user';

export class UsersListDataSource  implements DataSource<User> {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private userService: UserService) {}

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.usersSubject.complete();
    this.loadingSubject.complete();
  }

  loadUsers(pageIndex = 0, pageSize = 15) {

    this.loadingSubject.next(true);

    this.userService.getList(pageIndex, pageSize).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
    )
    .subscribe((list: UserList) => {
      this.usersSubject.next(list.users);
    });
  }
}
