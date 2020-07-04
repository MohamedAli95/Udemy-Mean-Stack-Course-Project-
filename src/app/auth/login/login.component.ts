import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  constructor(public authService: AuthService) { }
  authStatusSubject: Subscription;
  ngOnInit() {
    this.authStatusSubject = this.authService.getAuthStatusListener().subscribe(
      authstatus => {
        this.isLoading = authstatus;
      });
  }
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }
  ngOnDestroy() {
    this.authStatusSubject.unsubscribe();
  }
}
