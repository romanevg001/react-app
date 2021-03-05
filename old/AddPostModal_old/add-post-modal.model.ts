import { Subject} from 'rxjs';

export class AddPostModalFormModel {
  title = '';
  jobType = 'CEILING';
  jobStationingType = 'AUTO';
  body = '';
  textC = '';
}

export class AddPostModalState {
  isShow = false;
  validated = false;
  initialFormValues = new AddPostModalFormModel();
}

export interface AddPostModalModel {
  emitter: Subject<boolean>;
  updateList(): void;
}
