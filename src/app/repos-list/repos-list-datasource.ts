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

  /**
   * Enables the datasource
   * @param collectionViewer
   */
  connect(collectionViewer: CollectionViewer): Observable<Repo[]> {
    return this.reposSubject.asObservable();
  }

  /**
   * Disables the datasource
   * @param collectionViewer
   */
  disconnect(collectionViewer: CollectionViewer): void {
    this.reposSubject.complete();
    this.loadingSubject.complete();
  }

  /**
   * Calls the service to get users for the table
   * @param pageIndex Current page's index (0 based)
   * @param pageSize Number of itens per page
   */
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
