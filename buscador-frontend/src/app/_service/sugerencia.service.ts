import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Sugerencia } from '../_model/Sugerencia';
import 'rxjs/add/operator/map';
import {ConstantsService} from './constante.service';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SugerenciaService {

  public urlEndPoint = this._constant.apiSugerenciaBckUrl;

  constructor(public http: HttpClient,
              public _constant: ConstantsService,
              public router: Router,
              public snackBar: MatSnackBar) { }



  getSugerencia(id): Observable<Sugerencia> {
    return this.http.get<Sugerencia>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        } else {
       /*   this.snackBar.open('Se ha cerrado sessión por límite de tiempo', 'X', {
            duration: 10000,
            verticalPosition: 'bottom',
            panelClass: ['snackbar-action-info']
          });  */
        }
        return throwError(e);
      }));
  }

  getSugerencias(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Sugerencia[]).forEach(sugerencia => console.log(sugerencia.comentario));
      }),
      map((response: any) => {
        (response.content as Sugerencia[]).map(sugerencia => {
          sugerencia.comentario = sugerencia.comentario.toUpperCase();
          return sugerencia;
        });
        return response;
      }),
      tap(response => {
        (response.content as Sugerencia[]).forEach(sugerencia => console.log(sugerencia.comentario));
      }));
  }


  create(sugerencia: Sugerencia): Observable<Sugerencia> {
    return this.http.post(`${this.urlEndPoint}/guardarSugerencia`, sugerencia)
      .pipe(
        map((response: any) => response.sugerencia as Sugerencia),
        catchError(e => {
          if (e.status === 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        }));
  }

  update(sugerencia: Sugerencia): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${sugerencia.id}`, sugerencia).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }

  delete(id: number): Observable<Sugerencia> {
    return this.http.delete<Sugerencia>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }

}
