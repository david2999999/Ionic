import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from "./booking.service";
import {Booking} from "./booking.model";
import {IonItemSliding} from "@ionic/angular";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  bookings: Booking[];
  private bookingSub: Subscription;

  constructor(private bookingsService: BookingService) { }

  ngOnInit() {
    this.bookingSub = this.bookingsService.bookings.subscribe(bookings => {
      this.bookings = bookings;
    });
  }

  onCancelBooking(id: string, slidingEl: IonItemSliding) {
    slidingEl.close();
  }

  ngOnDestroy(): void {
    if (this.bookingSub) this.bookingSub.unsubscribe();
  }
}
