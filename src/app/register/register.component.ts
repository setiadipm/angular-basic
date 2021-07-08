import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  @ViewChild('emailInput') emailInput: ElementRef;
  form: FormGroup;
  formSubmitted = false;
  isLoading = false;
  authError: string;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmation: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    this.emailInput.nativeElement.focus();
  }

  async onSubmit(): Promise<void> {
    this.authError = null;
    this.formSubmitted = true;
    if (this.form.valid) {
      const email = this.form.value['email'];
      const password = this.form.value['password'];
      const confirmation = this.form.value['confirmation'];

      if (password != confirmation) {
        this.authError = 'Invalid confirmation password';
        return;
      }

      this.isLoading = true;
      try {
        await this.authService.register(email, password);
        this.router.navigate(['/auth']);
      } catch (error) {
        this.isLoading = false;
        this.authError = error.message;
      }
    }
  }

}
