import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit {

  colors = ['#dda0dd', '#FF7F50', '#483D8B', '#1E90FF', '#CD853F', '#008080']
  color: any

  constructor() { }
  @Input() ownerId!: string
  @Input() initials!: string
  @Input() scale: number = 1

  ngOnInit(): void {
    this.color = this.getRandomColor();
  }


  getRandomColor() {
    let hash = this.initials.charCodeAt(0) + this.initials.charCodeAt(1)
    return this.colors[hash % this.colors.length];
  }

}
