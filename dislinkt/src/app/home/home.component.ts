import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from '../model/Post';
import { PostService } from '../service/post.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userId!: string
  posts!: Post[]
  constructor(private storageService: StorageService,
     private postService: PostService,
     private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.userId = this.storageService.getIdFromToken();
    this.postService.getPosts(this.userId).subscribe((data:any) => {
      this.posts = data
      this.posts = this.posts.map(post => post = {...post, image: this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + post.image)})
    })
  }
}
