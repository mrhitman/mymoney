import Controller from '../../components/controller';
import CategoryProvider from './category-controller';

export class CategoryController extends Controller {
  protected path = '/categories';
  protected provider: CategoryProvider;

  constructor(provider?: CategoryProvider) {
    super();
    this.provider = provider || new CategoryProvider();
  }

  protected create() {}
}

export default CategoryController;
