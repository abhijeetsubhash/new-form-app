import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { PostService } from '../services/post.service';

@Component({
  selector: 'post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css'],
})
export class PostCommentsComponent implements OnInit {
  posts: any = [];

  constructor(private post: PostService) {}

  ngOnInit(): void {
    this.post.getAll().subscribe(
      (posts) => {
        this.posts = posts;
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          alert('No Service Found !');
        } else throw error
      }
    );
  }

  createPost(input: HTMLInputElement) {
    let post: any = { title: input.value };
    this.posts.splice(0, 0, post);

    input.value = '';
    this.post.create(post).subscribe(
      (response) => {
        post.id = response;
        console.log(response);
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          alert('Service Not Found !');
        } else throw error
      }
    );
  }

  updatePost(post: any) {
    console.log('post_id ' + post.id);
    this.post.update(JSON.stringify(post)).subscribe(
      (response) => {
        console.log(response);
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          alert('Service Not Found !');
        } else throw error
      }
    );
  }

  deletePost(post: any) {
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.post.delete(post).subscribe(
      (response) => {

      },
      (error: AppError) => {
        this.posts.splice(1,0,post);
        if (error instanceof NotFoundError) {
          alert('No Service Found !');
        } else throw error
      }
    );
  }
}
