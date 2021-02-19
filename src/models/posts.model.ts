import {BaseModel} from './base.model';

export class PostModel extends BaseModel {
  userId = -1;
  id = -1;
  title = '';
  body = '';
  constructor(prop?: any) {
    super();
    super.checkFields(prop);
  }
}

