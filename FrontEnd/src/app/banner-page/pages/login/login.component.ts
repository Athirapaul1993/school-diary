import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})




export class LoginComponent {

  LoginForm: any //initialization

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService) {
    this.LoginForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }


  submit() {
    let value = this.LoginForm.value
    this.auth.login(value)
      .subscribe( (res: any) => {
          if (res.status && res.token) {
            //local storage
            localStorage.setItem('accessToken', res.token)
            Swal.fire({
              icon: 'success',
              title: '  Logged In!',
              showConfirmButton: false,
              timer: 1500
            })
              .then(() => {
                this.router.navigate(['/dashboard'])
              })
          }
       
        else  if (res.status === 401) {

            Swal.fire({
              icon: 'error',
              title: res.error,
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.LoginForm.reset()
            })
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Network Error. Please try again',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.LoginForm.reset()
            })
          }
        
      })
  }
}
