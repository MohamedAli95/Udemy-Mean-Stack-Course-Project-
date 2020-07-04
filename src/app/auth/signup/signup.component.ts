import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;
  authStatusSubject: Subscription;
  constructor(public authService: AuthService) { }


  ngOnInit() {
    this.authStatusSubject = this.authService.getAuthStatusListener().subscribe(
      authstatus => {
        this.isLoading = authstatus;
      }
    );
  }
  onsignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    console.log(form.value);
    this.authService.createUser(form.value.email, form.value.password);
  }
  ngOnDestroy() {
    this.authStatusSubject.unsubscribe();
  }
}
