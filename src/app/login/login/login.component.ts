import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServicosAplicacaoService } from 'src/app/shared/servicos-aplicacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  profileForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(4)]],
    senha: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]]
  });


  constructor(
    private fb: FormBuilder,
    private servico: ServicosAplicacaoService
  ) { }

  ngOnInit(): void {
    this.servico.removeToken();
    this.servico.getToken();
   
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
    console.log(this.profileForm.value);
    const usuario = this.profileForm.value;
    this.servico.fazerOlogin(usuario);
   
  }
  

}
