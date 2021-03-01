import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PersonsService} from "./persons.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit, OnDestroy {
  private personListSubscribe: Subscription;
  isFetching = false;
  personList: string[];

  constructor(private personsService: PersonsService) { }

  ngOnInit(): void {
    this.personListSubscribe = this.personsService.personsChanged.subscribe(persons => {
      this.personList = persons;
      this.isFetching = false;
    });

    this.isFetching = true;
    this.personsService.fetchPersons();
  }

  onRemovePerson(name: string) {
    this.personsService.removePerson(name);
  }

  ngOnDestroy(): void {
    this.personListSubscribe.unsubscribe();
  }
}
