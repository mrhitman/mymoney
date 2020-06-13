import { Injectable } from '@nestjs/common';
import { Recipe } from './models/recipe.model';

@Injectable()
export class RecipesService {
    async findOneById(id: string): Promise<Recipe> {
        return {} as any;
    }
}