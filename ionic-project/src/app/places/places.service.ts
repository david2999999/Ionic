import { Injectable } from '@angular/core';
import {Place} from "./place.model";
import {AuthService} from "../auth/auth.service";
import {BehaviorSubject} from "rxjs";
import {delay, map, take, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>(
    [
      new Place('p1',
        'Manhattan Mansion',
        'In the heart of NYC',
        'https://img-vimbly-com-images.imgix.net/full_photos/manhattan-night-tour-1.jpg?auto=compress&fit=crop&h=490&ixlib=php-1.2.1&w=730',
        149.99,
        new Date('2019-01-01'),
        new Date('2019-12-01'),
        'abc'),
      new Place('p2',
        'Amour Toujours',
        'A romantic place in Paris',
        'https://stillmed.olympic.org/media/Images/OlympicOrg/News/2019/11/27/2019-11-27-paris-thumbnail.jpg',
        249.99,
        new Date('2018-01-01'),
        new Date('2019-12-01'),
        'abc'),
      new Place('p3',
        'The Foggy Palace',
        'Not Your Average City Trip',
        'https://i.pinimg.com/originals/18/30/b1/1830b1e06b0d68f0cab6809609ddc4cf.jpg',
        99.99,
        new Date('2017-01-01'),
        new Date('2019-12-01'),
        'abc')
    ]
  );

  constructor(private authService: AuthService,
              private http: HttpClient) {}

  get places() {
    return this._places.asObservable();
  }

  getPlace(id: string) {
    return this.places.pipe(take(1), map(places => {
      return {...places.find(p => p.id === id)};
    }));
  }

  addPlace(title: string, description: string, price: number,
           dateFrom: Date, dateTo: Date) {
      const newPlace = new Place(Math.random().toString(), title, description,
        "https://i.pinimg.com/originals/88/1e/1d/881e1dc65eebd686b254da0e55ccdc6a.jpg",
        price, dateFrom, dateTo, this.authService.userId);

      return this.http.post('https://ionic-angular-4a8f8-default-rtdb.firebaseio.com/offered-places.json',
        {
          ...newPlace,
          id: null
        }
      ).pipe(
        tap(resData => {
          console.log(resData);
        }
      ));
  }

  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap(places => {
        const updatedPlaceIndex = places.findIndex(place => place.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(oldPlace.id, title, description,
          oldPlace.imageUrl, oldPlace.price, oldPlace.availableFrom, oldPlace.availableTo, oldPlace.userId);
        this._places.next(updatedPlaces);
      })
    );
  }
}
