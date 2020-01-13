import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Oportunidad } from '../_model/oportunidad';
import { OportunidadNegocioCubso } from '../_model/oportunidad-negocio-cubso';
import { Ficha } from '../_model/ficha';
import { Sugerencia } from '../_model/Sugerencia';
import 'rxjs/add/operator/map';
import {ConstantsService} from './constante.service';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class OpnegocioService {

  url = this._constant.apiOportunidadNegocioBckUrl;

  constructor(private http: HttpClient,
              public _constant: ConstantsService,
              public snackBar: MatSnackBar) { }

  public listar(oportunidad: Oportunidad) {
    let sintesis;
    if (!oportunidad.sintesisProceso) {
      sintesis = '0';
    } else {
      sintesis = oportunidad.sintesisProceso;
    }
    return this.http.get<Oportunidad[]>(`${this.url}/codObjeto/codDepartamento/sintesisProceso/codTipoProceso/
    ${oportunidad.codObjeto}/${oportunidad.ubigeo}/${sintesis}/${oportunidad.codTipoProceso}`);
  }

  public listarDescripcion(oportunidad: Oportunidad) {
    let detalle;
    if (!oportunidad.detItem) {
      detalle = '0';
    } else {
      detalle = oportunidad.detItem;
    }
    return this.http.get<Oportunidad[]>(`${this.url}/codObjeto/codDepartamento/sintesisProceso/codTipoProceso/
    ${oportunidad.codObjeto}/${oportunidad.ubigeo}/${detalle}/${oportunidad.codTipoProceso}`);
  }

  public listaSegmentoCubso() {
    return this.http.get<OportunidadNegocioCubso[]>(`${this.url}/listaSegmentoCubso`);
  }

  public listarGeoreferenciacion(depa: any) {
    return this.http.get<Oportunidad[]>(`${this.url}/georeferenciacion/codDepartamento/${depa}`);
  }

  public listarProcesosSegmento(codigoSegmento: string) {
    return this.http.get<Oportunidad[]>(`${this.url}/listaProcesosCubso/codigoSegmento/${codigoSegmento}`);
  }

  public verFichaProceso(idProceso: string) {
    return this.http.get<Ficha>(`${this.url}/fichaProceso/idProceso/${idProceso}`);
  }

  public guardarSugerencia(sugerencia: Sugerencia) {
    return this.http.get<any>(`${this.url}/guardarSugerencia/lista/comentario/${sugerencia.lista}/${sugerencia.comentario}`);
  }

  public listarTotal() {
    return this.http.get<any>(`${this.url}/findAll`);
  }

  public contarTotal() {
    return this.http.get<any>(`${this.url}/count`);
  }

}
