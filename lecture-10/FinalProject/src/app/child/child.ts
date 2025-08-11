import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, DoCheck, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.css'
})
export class Child implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
  @Input() message: string = "input from the child"
  constructor() {
    console.log("child component")
    console.log(this.message);
  }

  ngOnChanges() {
    console.log("onChanges:", this.message)
  }

  ngOnInit() {
    console.log("onInit:", this.message)
  }

  @ContentChild('projectedPara') projectedPara !: ElementRef;
  ngDoCheck() {
    console.log("ngDoCheck:", this.message)
    console.log("ngDoCheck:", this.projectedPara);
  }
  
  @ViewChild('para') para !: ElementRef;
  ngAfterContentInit() {
    console.log("ngAfterContentInit:", this.projectedPara);

  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked:", this.projectedPara);
  }


  ngAfterViewInit() {
    console.log("ngAfterViewInit:", this.para);

  }

  ngAfterViewChecked() {
    console.log();
  }
}
