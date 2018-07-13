import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { UserService } from '../services/user.service';
import { Repo } from '../models/repo';

export class ReposListDataSource implements DataSource<Repo> {
  private reposSubject = new BehaviorSubject<Repo[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private userService: UserService) {}

  connect(collectionViewer: CollectionViewer): Observable<Repo[]> {
    return this.reposSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.reposSubject.complete();
    this.loadingSubject.complete();
  }

  loadRepos(username: string) {
    console.log('loadRepos', username);

    this.loadingSubject.next(true);

    this.userService.getReposByUsername(username).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
    )
    .subscribe((list: Repo[]) => {
      this.reposSubject.next(list);
    });
  }
}
