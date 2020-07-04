import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mime-Type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy {
  enetredContent = '';
  eneteredTitle = '';
  private mode = 'create';
  private postId: string;
  post: Post;
  isLoading = false;
  form: FormGroup;
  imagePrieview: string;
  authStatusSub: Subscription;
  constructor(public postService: PostsService,
              public route: ActivatedRoute,
              private authService: AuthService
  ) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false;
    });
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })

    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getpost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id, title: postData.title, content: postData.content, imagePath: postData.imagePath,
            creator: postData.creator
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath

          });
        });
        console.log(typeof (paramMap));
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
      this.form.reset();
    } else {
      this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);
      this.form.reset();
    }
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePrieview = (reader.result as string);
    };
    reader.readAsDataURL(file);
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
