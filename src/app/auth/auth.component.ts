import { Component, OnDestroy, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();
  user: firebase.auth.UserCredential;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.pipe(
      takeUntil(this.onDestroy$),
      tap(user => {
        this.user = user;
      })
    ).subscribe();
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
