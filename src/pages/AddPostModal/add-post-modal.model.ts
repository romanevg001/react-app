import { Subject} from 'rxjs';


export class AddPostModalState {
  isShow = false;
  initialFormValues = {
    title: '',
    body: ''
  }
}

export interface AddPostModalModel {
  emitter: Subject<boolean>;
  updateList(): void;
}
