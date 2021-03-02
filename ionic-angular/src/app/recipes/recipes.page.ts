import { Component, OnInit } from '@angular/core';
import {Recipe} from "./recipe.model";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  recipes: Recipe[] = [
    {
      id: 'r1',
      title: "Schnitzel",
      imageUrl: "https://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-5.jpg",
      ingredients: ['French Fries', 'Pork Meat', 'Salad']
    },
    {
      id: 'r1',
      title: "Spaghetti",
      imageUrl: "https://www.foodiecrush.com/wp-content/uploads/2017/09/My-Moms-Homemade-Spaghetti-and-Meat-Sauce-foodiecrush.com-017-683x1024-1.jpg",
      ingredients: ['Spaghetti', 'Meat', 'Tomato']
    }
  ];

  constructor() { }
  ngOnInit() { }
}
