import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-person-input',
  templateUrl: './person-input.component.html',
  styleUrls: ['./person-input.component.css']
})
export class PersonInputComponent implements OnInit {
  @Output() personCreated = new EventEmitter<string>();
  enteredPersonName = '';

  constructor() { }

  ngOnInit(): void {
  }

  onCreatePerson() {
    this.personCreated.emit(this.enteredPersonName);
    this.enteredPersonName = '';
  }
}
