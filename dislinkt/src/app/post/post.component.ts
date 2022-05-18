import { Component, Input, OnInit } from '@angular/core';
import { ReactionDTO } from '../dto/ReactionDTO';
import { RemoveReactionDTO } from '../dto/RemoveReactionDTO';
import { Post } from '../model/Post';
import { PostService } from '../service/post.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  userId!: string
  constructor(private postService: PostService, private storageService: StorageService) {
    this.post = {
      id: '628542aa1adebd7516d97fa5',
      comments: [
        {
        text: "Nice",
        ownerId: "652e00d7-9930-487e-89ee-1bae54bf55c2",
        firstName: "Neko",
        lastName: "Nekic"
    }, {
      text: "Good post",
      ownerId: "652e00d7-9930-487e-89ee-1bae54bf55c2",
      firstName: "Neko",
      lastName: "Nekic"
  }],
      creationDate: '12/09/1999',
      dislikes: [],
      likes: [],
      ownerId: 'pera',
      firstName: "Pera",
      lastName: "Peric",
      text: 'Moj prvi post',
      image: undefined
    }
  }

  isLiked() {
    return this.post.likes.includes(this.userId)
  }
  isDisliked() {
    return this.post.dislikes.includes(this.userId)
  }
  getNumOfLikes() {
    return this.post.likes.length
  }
  getNumOfDislikes() {
    return this.post.dislikes.length
  }

  getInitials(firstName: string, lastName: string) {
    return firstName.charAt(0) + lastName.charAt(0)
  }
  ngOnInit(): void {
    this.userId = this.storageService.getIdFromToken();
  }

  like() {
    if (this.isLiked())
      return
    let reactionDTO : ReactionDTO = {
      userId: this.userId,
      like: true
    }
    this.postService.addReaction(this.post.id, reactionDTO).subscribe((data:any) => {
      this.post.likes = [...this.post.likes, this.userId];
      this.removeFromDislikes(this.userId)
    }, (err: Error) => {
      void(0)
    })
  }

  dislike() {
    if (this.isDisliked())
    return
  let reactionDTO : ReactionDTO = {
    userId: this.userId,
    like: false
  }
  this.postService.addReaction(this.post.id, reactionDTO).subscribe((data:any) => {
    this.post.dislikes = [...this.post.dislikes, this.userId];
    this.removeFromLikes(this.userId)
  }, (err: Error) => {
    void(0)
  })
  }

  removeReaction() {
    let removeReactionDTO : RemoveReactionDTO = {
      userId: this.userId
    }
    this.postService.removeReaction(this.post.id, removeReactionDTO).subscribe((data:any) => {
      this.removeFromLikes(this.userId)
      this.removeFromDislikes(this.userId)
    }, (err: Error) => {
      void(0)
    })
  }



  private removeFromLikes(userId: string) {
    const index = this.post.likes.indexOf(this.userId);
      if (index > -1) {
        this.post.likes.splice(index, 1);
      }
  }

  private removeFromDislikes(userId: string) {
    const index = this.post.dislikes.indexOf(this.userId);
      if (index > -1) {
        this.post.dislikes.splice(index, 1);
      }
  }

}
