import { EMPTY, Observable, of, defer } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { PostModel } from '../../models/posts.model';
import { PostsStore, postsStore } from './state/main.store';
import { PostsQuery, postsQuery } from './state/main.query';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';
axios.defaults.headers.common['Authorization'] = 'Barer kjdsfsdkjfjsdlfk'
axios.interceptors.response.use(res => {
  console.log(res)

  return res;
}, err => {
  console.log(err)
})

export class MainService  {

  private api = 'posts';

  constructor(
    private postsStore: PostsStore,
    private postsQuery: PostsQuery
  ) {
  }

  getPosts(): Observable<PostModel[]> {
    const posts = this.postsQuery.getAll();
    if (posts.length) {return of(posts)}

    return defer(() => axios.get(this.api)).pipe(
      map((res: any) => {
        this.postsStore.set(res.data);
        return res.data;
      }),
      catchError(error => {
        return EMPTY;
      })
    ) as Observable<PostModel[]>; 
    /* 
    return ajax({
      url: this.api,
      method: 'GET',
      option: this.ajaxServise.getDefaultOption();
    }).pipe(
      map((res: any) => {
        this.postsStore.set(res.response);
        return res.response;
      }),
      catchError(error => {
        this.ajaxServise.interceptor(error)
        return EMPTY;
      })
    ) as Observable<PostModel[]>; */
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
