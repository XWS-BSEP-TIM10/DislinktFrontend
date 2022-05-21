import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-interest-modal',
  templateUrl: './interest-modal.component.html',
  styleUrls: ['./interest-modal.component.scss']
})
export class InterestModalComponent implements OnInit {


  constructor(public activeModal: NgbActiveModal) { }


  interestForm = new FormGroup({
    description: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
  }


  passBack() {
    if (this.interestForm.invalid)
      return
    this.activeModal.close(this.interestForm.get('description')?.value);
  }

  close() {
    this.activeModal.dismiss('')
  }

}
