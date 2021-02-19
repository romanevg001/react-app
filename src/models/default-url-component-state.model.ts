export interface DefaultURLComponentState {
  history?: any;
  location?: any;
  match?: {
    isExact?: boolean;
    params?: any;
    path?: string;
    url?: string;
  };
  staticContext?: any;
}