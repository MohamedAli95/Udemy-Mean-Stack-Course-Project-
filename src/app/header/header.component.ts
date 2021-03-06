import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSubs: Subscription;
  userIsAuth = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userIsAuth = this.authService.getIsAuth();
    console.log(this.userIsAuth);
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.userIsAuth = isAuth;
    });
  }
  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
