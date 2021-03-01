import {Component, OnInit} from '@angular/core';
import {PersonsService} from "../persons.service";

@Component({
  selector: 'app-person-input',
  templateUrl: './person-input.component.html',
  styleUrls: ['./person-input.component.css']
})
export class PersonInputComponent implements OnInit {
  enteredPersonName = '';

  constructor(private personsService: PersonsService) { }

  ngOnInit(): void { }

  onCreatePerson() {
    this.personsService.addPerson(this.enteredPersonName);
    this.enteredPersonName = '';
  }
}
