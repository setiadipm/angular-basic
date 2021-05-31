import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('emailInput') emailInput: ElementRef;
  form: FormGroup;
  formSubmitted = false;
  isLoading = false;
  authError: string;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    this.emailInput.nativeElement.focus();
  }

  async onLogin(): Promise<void> {
    this.authError = null;
    this.formSubmitted = true;
    if (this.form.valid) {
      this.isLoading = true;
      const email = this.form.value['email'];
      const password = this.form.value['password'];
      await this.authService.login(email, password).catch(
        error => {
          this.authError = error.message;
        }
      );

      this.isLoading = false;
      this.formSubmitted = false;
      this.form.reset();
    }
  }

}
