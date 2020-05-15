import axios, {AxiosInstance} from 'axios';
import {SnapshotOrInstance} from 'mobx-state-tree';
import {Category} from '../store/category';

export class Api {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({baseURL: 'http://192.168.121.23:3100'});
  }

  public sendCategory = async (
    category: SnapshotOrInstance<typeof Category>,
  ) => {
    const response = await this.client.post('/categories', category);
    console.log(response.data);
    return;
  };
}

export default Api;
