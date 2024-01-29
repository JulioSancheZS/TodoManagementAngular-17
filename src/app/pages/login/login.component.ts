import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup

  /**
   *
   */
  constructor(private fb: FormBuilder, private authService: AuthService) {
      this.loginForm = this.fb.group({
        email: new FormControl('',[Validators.required, Validators.email]),
        password: new FormControl('',[Validators.required]),
      })
  }

  onSubmit(){
    if(this.loginForm.valid){
    //  console.log(this.loginForm.value)
      this.authService.onLogin(this.loginForm.value).subscribe({
          next: (response) => {
            if(response.status){
                
            }else{
              console.log(response.msg)
            }
          },
          error: (error) => {
            console.log(error);
          }
        });
    }else{
      this.loginForm.markAllAsTouched();
    }
  }

}
