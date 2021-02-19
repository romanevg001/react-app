import { QueryEntity, QueryConfig, Order } from '@datorama/akita';
import { PostsStore, PostsState, postsStore } from './main.store';


@QueryConfig({
  sortBy: (a: any, b: any) => (a[`title`]).localeCompare(b[`title`]),
  sortByOrder: Order.ASC
})
export class PostsQuery extends QueryEntity<PostsState> {
  constructor(protected store: PostsStore) {
    super(store);
    this.createUIQuery();
  }
}
export const postsQuery = new PostsQuery(postsStore);