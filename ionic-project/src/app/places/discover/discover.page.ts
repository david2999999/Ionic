import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacesService} from "../places.service";
import {Place} from "../place.model";
import {MenuController} from "@ionic/angular";
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  private placesSub: Subscription;
  places: Place[];
  relevantPlaces: Place[];
  listedLoadedPlaces: Place[];
  isLoading = false;

  constructor(private placesService: PlacesService,
              private menuController: MenuController,
              private authService: AuthService) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.places = places;
      this.relevantPlaces = this.places;
      this.listedLoadedPlaces = this.places.slice(1);
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  // onOpenMenu() {
  //   this.menuController.toggle();
  // }

  onFilterUpdate(event: CustomEvent) {
    if (event.detail.value === 'all') {
      this.relevantPlaces = this.places;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    } else {
      this.relevantPlaces = this.places.filter(place => place.userId !== this.authService.userId);
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }
  }

  ngOnDestroy(): void {
    if (this.placesSub) this.placesSub.unsubscribe();
  }
}
