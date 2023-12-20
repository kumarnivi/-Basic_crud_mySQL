import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
signupForm: any;
  loginForm: any;

constructor(private api:ApiService, private fb:FormBuilder) {}

loginFunction() {
  this.loginForm = this.fb.group({
    // // 2ND COMPONENT
    // fullName: new FormControl('', [
    //   Validators.required,
    //   Validators.pattern(`^[A-Za-z ]+$`),
    // ]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    // address: new FormControl('', [Validators.required]),
   
  });
}




get f(): { [key: string]: AbstractControl } {
return this.signupForm.controls;
}
ngOnInit(): void {
this.loginFunction()
}


submit() {
const FormData = {
  password: this.loginForm.value.password,
  email: this.loginForm.value.email
}

if(this.loginForm.valid){
  this.api.post('/api/login', FormData).subscribe(
    (response: any) => {
      console.log('Leave request submitted successfully');
    },
    (error) => {
      console.error('Error submitting leave request:', error);
    }
  );
}
  
}

}
