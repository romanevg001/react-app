import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { PostModel } from '../../models/posts.model';
import { PostsStore, postsStore } from './state/main.store';
import { PostsQuery, postsQuery } from './state/main.query';

export class MainService  {
  private api = 'https://jsonplaceholder.typicode.com/posts';

  constructor(
    private postsStore: PostsStore,
    private postsQuery: PostsQuery,
  ) {}

  getPosts(): Observable<PostModel[]> {
    const posts = this.postsQuery.getAll();
    if (posts.length) {return of(posts)}
    return ajax({
      url: this.api,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'rxjs-custom-header': 'Rxjs'
      },
    }).pipe(
      map(res => {
        this.postsStore.set(res.response);
        return res.response;
      }),
      catchError(error => {
        return of([]);
      })
    ) as Observable<PostModel[]>;
  }


  updatePost(post: PostModel): Observable<boolean> {
    this.postsStore.update(post.id, post);
    return of(true)
  }

  savePost(post: PostModel): Observable<boolean> {
    this.postsStore.add(post);
    return of(true)
  }

}

export const mainService: MainService = new MainService(postsStore, postsQuery);
