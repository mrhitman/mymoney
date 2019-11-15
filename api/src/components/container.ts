import { Container } from 'inversify';
import CategoryProvider from '../modules/category/category-service';
import CategoryController from '../modules/category/category-controller';

const container = new Container();
container.bind('category-controller').to(CategoryController);
container.bind('category').to(CategoryProvider);

export default container;
