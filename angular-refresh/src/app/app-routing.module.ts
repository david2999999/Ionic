import {RouterModule, Routes} from "@angular/router";
import {PersonsComponent} from "./persons/persons.component";
import {PersonInputComponent} from "./persons/person-input/person-input.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  { path: '', component: PersonsComponent },
  { path: 'input', component: PersonInputComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
