import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Child } from './child/child';


@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, Child],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  inputValue: string = "input from parent"

  counter: number = 0
  constructor() {
    console.log("root component");
  }


  changeInput(){
    this.inputValue = "input changed by parent";
  }

}
