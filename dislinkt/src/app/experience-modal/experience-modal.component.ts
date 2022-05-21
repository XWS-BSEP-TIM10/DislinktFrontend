import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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


  experienceForm = new FormGroup({
    institution: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    fromDate: new FormControl('', Validators.required),
    toDate: new FormControl(''),
    description: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    if (this.experience) {
      this.experienceForm.get('institution')?.setValue(this.experience.institution)
      this.experienceForm.get('position')?.setValue(this.experience.position)
      this.experienceForm.get('fromDate')?.setValue(moment(this.experience.fromDate, 'DD/MM/YYYY').format('YYYY-MM-DD'))
      this.experienceForm.get('toDate')?.setValue(moment(this.experience.toDate, 'DD/MM/YYYY').format('YYYY-MM-DD'))
      this.experienceForm.get('description')?.setValue(this.experience.description)
    }
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
