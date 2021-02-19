import {DefaultURLComponentState} from '../../models/default-url-component-state.model';
import {PostModel} from '../../models/posts.model';


export interface PostPageComponentState extends DefaultURLComponentState {
  post: PostModel;
  isEdit: boolean;
}

export interface PostPageComponentModel extends PostPageComponentState {

}