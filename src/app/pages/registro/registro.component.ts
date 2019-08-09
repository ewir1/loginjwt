import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { UsuarioModel } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  mensajeError: '';
  recordarme = false;


  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    // this.usuario.email = 'ewirjose1@gmail.com';
  }

  onSubmit(form: NgForm) {

    if (form.invalid) {
      return;
    }

    // console.log('Formulario Enviado');
    // console.log(this.usuario);
    // console.log(form);

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario).subscribe(resp => {
      // console.log(resp);
      Swal.close();

      if (this.recordarme) {
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/home');
      
    }, (err) => {
        this.mensajeError = err.error.error.message;
        // console.log(this.mensajeError);
        Swal.fire({
          type: 'error',
          title: 'Error al autenticar',
          text: this.mensajeError
        });
    });
    
    
  }

}
