import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from "./booking.service";
import {Booking} from "./booking.model";
import {IonItemSliding, LoadingController} from "@ionic/angular";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  bookings: Booking[];
  private bookingSub: Subscription;

  constructor(private bookingsService: BookingService,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.bookingSub = this.bookingsService.bookings.subscribe(bookings => {
      this.bookings = bookings;
    });
  }

  onCancelBooking(bookingId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingController.create({
      message: 'Cancelling'
    }).then(loadingEl => {
      loadingEl.present();

      this.bookingsService.cancelBook(bookingId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.bookingSub) this.bookingSub.unsubscribe();
  }
}
