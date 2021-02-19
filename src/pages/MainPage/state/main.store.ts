import {  EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import {  PostModel } from '../../../models/posts.model';


export interface PostsState extends EntityState<PostModel>, ActiveState { }

@StoreConfig({ name: 'posts', idKey: 'id' })
export class  PostsStore extends EntityStore<PostsState, PostModel> {
  constructor() {
    super({
      loading: false
    });
    this.createUIStore();
  }
}

export const postsStore = new PostsStore();

