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
  var hash = 0, i, chr;
  if (this.ownerId.length === 0) return hash;
  for (i = 0; i < this.ownerId.length; i++) {
    chr   = this.ownerId.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }

    return this.colors[hash % this.colors.length];
  }

}
