import { Component, OnInit } from '@angular/core';
import { AuthApiService } from './services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private authApiService: AuthApiService, private router: Router, private fb: FormBuilder) {}
  public loginForm!: FormGroup;
  public value!: string;
  public showPassword: boolean = false;
  public credentialsInvalid: boolean = false;
  public errorMessage = '';
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }


  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.authApiService.login(this.loginForm.value).subscribe({
      next: (data) => {
        this.credentialsInvalid = false;
        sessionStorage.setItem('token', data.token);
        this.router.navigate(['home/dashboard']);
      },
      error: (error) => {
        this.credentialsInvalid = true;
        this.errorMessage = 'Usuario y/o contraseña invalidas';
      }
    })
  }
}
