import { NgModule } from '@angular/core';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostlistComponent } from './postlist/postlist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [ReactiveFormsModule,
  AngularMaterialModule,
CommonModule,
RouterModule],
  declarations: [PostCreateComponent,
    PostlistComponent]
})

export class PostsModule { }
