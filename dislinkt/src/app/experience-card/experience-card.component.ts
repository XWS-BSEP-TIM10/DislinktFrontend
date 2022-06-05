import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateExperienceDTO } from '../dto/CreateExperienceDTO';
import { Experience } from '../model/Experience';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.scss']
})
export class ExperienceCardComponent implements OnInit {

  @Input() experience!: Experience
  @Input() userId!: string
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() editEvent = new EventEmitter<Experience>();
  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
  }

  deleteExperience() {
    this.deleteEvent.emit(this.experience.id);
  }

  editExperience() {
    this.editEvent.emit(this.experience)
  }

  isProfileOwner() {
    return this.userId === this.storageService.getIdFromToken()
  }
}
