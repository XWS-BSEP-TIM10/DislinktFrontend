import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentDTO } from '../dto/CommentDTO';
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
  constructor(private postService: PostService, private storageService: StorageService, private router: Router) {
  }

  commentForm = new FormGroup({
    text: new FormControl('', Validators.required),
  })


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

  createComment() {
    if (this.commentForm.invalid)
      return
    let commentDTO : CommentDTO = {
      userId: this.userId,
      text: this.commentForm.get('text')?.value,
    }
    this.postService.createComment(this.post.id, commentDTO).subscribe((data:any) => {
      this.post.comments = [...this.post.comments, data]
      this.commentForm.get('text')?.setValue('')
    })

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


  viewProfile(ownerId: string) {
    this.router.navigate([`users/${this.post.ownerId}`])
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
