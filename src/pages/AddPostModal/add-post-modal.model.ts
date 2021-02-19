import { Subject} from 'rxjs';


export interface AddPostModalState {
  isShow: boolean;
}

export interface AddPostModalModel {
  emitter: Subject<boolean>;
  updateList(): void;
}
