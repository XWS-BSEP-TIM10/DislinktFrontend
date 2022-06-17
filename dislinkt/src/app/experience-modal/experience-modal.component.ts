import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { CreateExperienceDTO } from '../dto/CreateExperienceDTO';
import { Experience } from '../model/Experience';

@Component({
  selector: 'app-experience-modal',
  templateUrl: './experience-modal.component.html',
  styleUrls: ['./experience-modal.component.scss']
})
export class ExperienceModalComponent implements OnInit {

  @Input() experience!: Experience
  constructor(public activeModal: NgbActiveModal) { }


  experienceForm = new UntypedFormGroup({
    institution: new UntypedFormControl('', Validators.required),
    position: new UntypedFormControl('', Validators.required),
    fromDate: new UntypedFormControl('', Validators.required),
    toDate: new UntypedFormControl(''),
    description: new UntypedFormControl('', Validators.required),
  })

  ngOnInit(): void {
    if (this.experience) {
      this.experienceForm.get('institution')?.setValue(this.experience.institution)
      this.experienceForm.get('position')?.setValue(this.experience.position)
      this.experienceForm.get('fromDate')?.setValue(moment(this.experience.fromDate, 'DD/MM/YYYY').format('YYYY-MM-DD'))
      this.experienceForm.get('toDate')?.setValue(this.experience.toDate ? moment(this.experience.toDate, 'DD/MM/YYYY').format('YYYY-MM-DD') : '')
      this.experienceForm.get('description')?.setValue(this.experience.description)
    }
    console.log(this.experience)
  }


  passBack() {
    if (this.experienceForm.invalid)
      return
    let createExperienceDTO: CreateExperienceDTO = {
      userId: '',
      institution: this.experienceForm.get('institution')?.value,
      position: this.experienceForm.get('position')?.value,
      fromDate: this.experienceForm.get('fromDate')?.value,
      toDate: this.experienceForm.get('toDate')?.value,
      description: this.experienceForm.get('description')?.value,
      type: 'WORK'
    }
    this.activeModal.close(createExperienceDTO);
  }

  close() {
    this.activeModal.dismiss('')
  }

}
