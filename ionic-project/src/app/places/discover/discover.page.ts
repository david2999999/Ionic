import { Component, OnInit } from '@angular/core';
import {PlacesService} from "../places.service";
import {Place} from "../place.model";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  places: Place[];
  listedLoadedPlaces: Place[];

  constructor(private placesService: PlacesService,
              private menuController: MenuController) { }

  ngOnInit() {
    this.places = this.placesService.places;
    this.listedLoadedPlaces = this.places.slice(1);
  }

  // onOpenMenu() {
  //   this.menuController.toggle();
  // }

  onFilterUpdate(event: CustomEvent) {
    console.log(event.detail);
  }
}
