import { Injectable } from '@angular/core';
import {Place} from "./place.model";
import {AuthService} from "../auth/auth.service";
import {BehaviorSubject} from "rxjs";
import {delay, map, switchMap, take, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number,
  title: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private BASE_URL = "https://ionic-angular-4a8f8-default-rtdb.firebaseio.com";
  private _places = new BehaviorSubject<Place[]>([]);

  constructor(private authService: AuthService,
              private http: HttpClient) {}

  get places() {
    return this._places.asObservable();
  }

  fetchPlaces() {
    return this.http.get<{[key: string]: PlaceData}>(this.BASE_URL + '/offered-places.json')
      .pipe(
        map(resData => {
          const places = [];

          for (const key in resData) {
            places.push(new Place(key, resData[key].title, resData[key].description,
              resData[key].imageUrl, resData[key].price,
              new Date(resData[key].availableFrom), new Date(resData[key].availableTo),
              resData[key].userId));
          }

          return places;
        }),
        tap(places => {
          this._places.next(places);
        })
      );
  }

  getPlace(id: string) {
    return this.places.pipe(take(1), map(places => {
      return {...places.find(p => p.id === id)};
    }));
  }

  addPlace(title: string, description: string, price: number,
           dateFrom: Date, dateTo: Date) {
      const newPlace = new Place(Math.random().toString(), title, description,
        "https://static.wikia.nocookie.net/cyberpunk/images/1/1c/NC-Profile-2077-Placeholder.jpg/revision/latest?cb=20200501024902",
        price, dateFrom, dateTo, this.authService.userId);

      return this.http.post<{name: string}>(this.BASE_URL + '/offered-places.json',
        {
          ...newPlace,
          id: null
        }
      ).pipe(
        switchMap(resData => {
          newPlace.id = resData.name;
          return this.places;
        }),
        take(1),
        tap(places => {
          this._places.next(places.concat(newPlace));
        })
      );
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
