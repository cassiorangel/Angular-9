import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  profileForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]]
  });


  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }
  get email() {
    return this.profileForm.get('email');
  }
  get senha() {
    return this.profileForm.get('senha');
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.profileForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    console.log(this.profileForm.value)
  }

}
