import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacesService} from "../places.service";
import {Place} from "../place.model";
import {MenuController} from "@ionic/angular";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  private placesSub: Subscription;
  places: Place[];
  listedLoadedPlaces: Place[];

  constructor(private placesService: PlacesService,
              private menuController: MenuController) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.places = places;
      this.listedLoadedPlaces = this.places.slice(1);
    });
  }

  // onOpenMenu() {
  //   this.menuController.toggle();
  // }

  onFilterUpdate(event: CustomEvent) {
    console.log(event.detail);
  }

  ngOnDestroy(): void {
    if (this.placesSub) this.placesSub.unsubscribe();
  }
}
