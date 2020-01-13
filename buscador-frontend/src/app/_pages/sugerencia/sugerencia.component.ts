import { Component, OnInit } from '@angular/core';
import { Sugerencia } from 'src/app/_model/Sugerencia';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SugerenciaService} from '../../_service/sugerencia.service';

@Component({
  selector: 'app-sugerencia',
  templateUrl: './sugerencia.component.html',
  styleUrls: ['./sugerencia.component.css']
})
export class SugerenciaComponent implements OnInit {

  checked1 = false;
  checked2 = false;
  checked3 = false;
  checked4 = false;
  checked5 = false;

  public sugerencia: Sugerencia = new Sugerencia();

  errores: string[];
  frmSugerencia: FormGroup;

  constructor(public dialogRef: MatDialogRef<SugerenciaComponent>,
              public sugerenciaService: SugerenciaService,
              public router: Router,
              public formBuilder: FormBuilder,
              public activatedRoute: ActivatedRoute,
              public snackBar: MatSnackBar) {


    this.frmSugerencia = this.formBuilder.group({
       email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
       lista: ['', [Validators.required]],
       comentario: ['']
    });

  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.sugerenciaService.getSugerencia(id).subscribe((sugerencia) => this.sugerencia = sugerencia);
      }
    });

  }

  guardarSugerencia() {
    if (!this.checked1 && !this.checked2 && !this.checked3 && !this.checked4 && !this.checked5 && !this.sugerencia.comentario && !this.sugerencia.email) {
       this.snackBar.open(
        `Por favor debe ingresar por lo menos una sugerencia y/o comentario`,
        'X', {
          duration: 10000,
          verticalPosition: 'bottom',
          panelClass: ['snackbar-action-error']
        });
       return;
    }
    let lista = ' ';
    if (this.checked1) {
      lista = `${lista}1,`;
    }
    if (this.checked2) {
      lista = `${lista}2,`;
    }
    if (this.checked3) {
      lista = `${lista}3,`;
    }
    if (this.checked4) {
      lista = `${lista}4,`;
    }
    if (this.checked5) {
      lista = `${lista}5,`;
    }
    this.sugerencia.lista = lista.trim();

    this.sugerenciaService.create(this.sugerencia).subscribe(
      persona => {
        this.snackBar.open(
          `Muchas gracias por enviarnos tu sugerencia`,
          'X', {
            duration: 10000,
            verticalPosition: 'bottom',
            panelClass: ['snackbar-action-success']
          });
      },
      error => {
        this.errores = error.error.errors as string[];
        console.error('Código del error desde el backend: ' + error.status);
        console.error(error.error.errors);
      }
    );
    this.dialogRef.close();
  }
}
