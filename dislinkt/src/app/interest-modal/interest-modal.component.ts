import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-interest-modal',
  templateUrl: './interest-modal.component.html',
  styleUrls: ['./interest-modal.component.scss']
})
export class InterestModalComponent implements OnInit {


  constructor(public activeModal: NgbActiveModal) { }


  interestForm = new UntypedFormGroup({
    description: new UntypedFormControl('', Validators.required),
  })

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
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
