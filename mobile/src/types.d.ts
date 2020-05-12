import {Instance} from 'mobx-state-tree';
import {Store} from './store/store';

export interface InjectedStore {
  store: Instance<typeof Store>;
}
