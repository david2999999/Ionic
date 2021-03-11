import { Injectable } from '@angular/core';
import {Booking} from "./booking.model";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {delay, switchMap, take, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private BASE_URL = "https://ionic-angular-4a8f8-default-rtdb.firebaseio.com";
  private _bookings = new BehaviorSubject<Booking[]>([]);

  constructor(private authService: AuthService,
              private httpClient: HttpClient) { }

  get bookings() {
    return this._bookings.asObservable();
  }

  addBooking(placeId: string, placeTitle: string, placeImage: string,
             firstName: string, lastName: string, guestNumber: number,
             dateFrom: Date, dateTo: Date) {
    const newBooking = new Booking(Math.random().toString(), placeId,
      this.authService.userId, placeTitle, placeImage, firstName, lastName,
      guestNumber, dateFrom, dateTo);

    return this.httpClient.post<{name: string}>(`${this.BASE_URL}/bookings.json`,
      {...this.bookings, id: null}
      ).pipe(switchMap(resData => {
        newBooking.id = resData.name;
        return this.bookings;
      }),
      take(1),
      tap(bookings => {
        this._bookings.next(bookings.concat(newBooking));
      })
    );
  }

  cancelBook(bookingId: string) {
    return this.bookings.pipe(
      take(1),
      delay(1000),
      tap(bookings => {
        this._bookings.next(bookings.filter(booking => booking.id !== bookingId));
      }));
  }
}
