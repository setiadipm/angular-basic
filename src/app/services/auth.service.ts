import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$ = new BehaviorSubject<firebase.auth.UserCredential>(null);
  appConfig: any;

  constructor(private auth: AngularFireAuth) { }

  get user(): Observable<firebase.auth.UserCredential> {
    return this.user$.asObservable();
  }

  register(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  async login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password).then((auth: firebase.auth.UserCredential) => {
      this.user$.next(auth);
      return auth;
    });
  }

  async logout(): Promise<void> {
    return this.auth.signOut().then(() => this.user$.next(null));
  }
}
