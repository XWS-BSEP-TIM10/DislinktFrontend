import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/shared';
import { CommentDTO } from '../dto/CommentDTO';
import { ReactionDTO } from '../dto/ReactionDTO';
import { RemoveReactionDTO } from '../dto/RemoveReactionDTO';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  private postUrl = "/posts"

  removeReaction(postId: string, removeReactionDTO: RemoveReactionDTO) {
    return this.http.put(`${config.baseUrl}${this.postUrl}/${postId}/remove-reaction`, removeReactionDTO)
  }
  addReaction(postId: string, reactionDTO: ReactionDTO) {
    return this.http.put(`${config.baseUrl}${this.postUrl}/${postId}/reaction`, reactionDTO)
  }
  createPost(formData: FormData) {
    return this.http.post(`${config.baseUrl}${this.postUrl}`, formData)
  }
  createComment(postId: string, commentDTO: CommentDTO) {
    return this.http.post(`${config.baseUrl}${this.postUrl}/${postId}/comment`, commentDTO)
  }
  getPosts(id: string) {
    return this.http.get(`${config.baseUrl}/users/${id}/posts`)
  }
  getFeed(id: string) {
    return this.http.get(`${config.baseUrl}/users/${id}/feed`)
  }
}
