import { Injectable } from '@angular/core';
import {Recipe} from "./recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: "Schnitzel",
      imageUrl: "https://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-5.jpg",
      ingredients: ['French Fries', 'Pork Meat', 'Salad']
    },
    {
      id: 'r2',
      title: "Spaghetti",
      imageUrl: "https://www.foodiecrush.com/wp-content/uploads/2017/09/My-Moms-Homemade-Spaghetti-and-Meat-Sauce-foodiecrush.com-017-683x1024-1.jpg",
      ingredients: ['Spaghetti', 'Meat', 'Tomato']
    }
  ];

  constructor() { }

  getAllRecipe() {
    return [...this.recipes];
  }

  getRecipe(recipeId: string) {
    return {...this.recipes.find(recipe => {
      return recipe.id === recipeId;
    })};
  }

  deleteRecipe(recipeId: string) {
    this.recipes = this.recipes.filter(recipe => {
      return recipe.id !== recipeId;
    });
  }
}
