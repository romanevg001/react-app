export class BaseModel {
  checkFields(row?: any): void {
    if (row) {
      for (const prop in this) {
        if (row.hasOwnProperty(prop)) {
            this[prop] =  row[prop];
        }
      }
    }
  }

}
