import {PostModel} from '../../models/posts.model';

export interface MainPageComponentState {
  posts: PostModel[];
}

export interface MainPageComponentModel extends MainPageComponentState {

}