import { Injectable } from '@angular/core';
import {Place} from "./place.model";

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place('p1',
      'Manhattan Mansion',
      'In the heart of NYC',
      'https://img-vimbly-com-images.imgix.net/full_photos/manhattan-night-tour-1.jpg?auto=compress&fit=crop&h=490&ixlib=php-1.2.1&w=730',
      149.99,
      new Date('2019-01-01'),
      new Date('2019-12-01')),
    new Place('p2',
      'Amour Toujours',
      'A romantic place in Paris',
      'https://stillmed.olympic.org/media/Images/OlympicOrg/News/2019/11/27/2019-11-27-paris-thumbnail.jpg',
      249.99,
      new Date('2019-01-01'),
      new Date('2019-12-01')),
    new Place('p3',
      'The Foggy Palace',
      'Not Your Average City Trip',
      'https://i.pinimg.com/originals/18/30/b1/1830b1e06b0d68f0cab6809609ddc4cf.jpg',
      99.99,
      new Date('2019-01-01'),
      new Date('2019-12-01'))
  ];

  constructor() { }

  get places() {
    return [...this._places];
  }

  getPlace(id: string) {
    return {...this._places.find(p => p.id === id)};
  }
}
