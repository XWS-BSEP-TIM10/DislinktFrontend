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
  @Output() deleteEvent = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }


  deleteInterest() {
    this.deleteEvent.emit(this.interest.id);
  }

}
