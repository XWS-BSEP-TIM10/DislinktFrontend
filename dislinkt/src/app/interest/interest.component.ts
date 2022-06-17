import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Interest } from '../model/Interest';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss']
})
export class InterestComponent implements OnInit {


  @Input() editMode: boolean = false
  @Input() interest!: Interest
  @Output() deleteEvent = new EventEmitter<Interest>();
  constructor() { /* TODO document why this constructor is empty */  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  
  }


  deleteInterest() {
    this.deleteEvent.emit(this.interest);
  }

}
