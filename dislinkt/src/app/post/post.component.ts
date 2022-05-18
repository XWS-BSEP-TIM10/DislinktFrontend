import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../model/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  constructor() {
    this.post = {
      id: '12312321',
      comments: [
        {
        text: "Nice",
        ownerId: "652e00d7-9930-487e-89ee-1bae54bf55c2"
    }, {
      text: "Good post",
      ownerId: "652e00d7-9930-487e-89ee-1bae54bf55c2"
  }],
      creationDate: '12/09/1999',
      dislikes: [],
      likes: [],
      ownerId: 'pera',
      text: 'Moj prvi post',
      image: undefined
    }
  }

  ngOnInit(): void {
  }

}
