import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  @Input('personList') persons: string[];

  constructor() { }
  ngOnInit(): void { }
}
