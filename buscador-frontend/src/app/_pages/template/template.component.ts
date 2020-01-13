import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Oportunidad } from 'src/app/_model/oportunidad';
import Swal from 'sweetalert2';

export interface SeletItem {
  value: string;
  viewValue: string;
}

declare const $: any;
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  panelOpenState = false;
  panelOpenStateBusquedaSimple = 0;
  oportunidad: Oportunidad;
  @Output() emisor = new EventEmitter();
  @Input() validaPanelSimple: boolean;
  @Input() validaPanelMultiple: boolean;

  tipoObjeto: SeletItem[] = [
    {value: '62', viewValue: 'Bienes'},
    {value: '63', viewValue: 'Consultoría de Obras'},
    {value: '64', viewValue: 'Obras'},
    {value: '65', viewValue: 'Servicios'},
    {value: '0', viewValue: 'Todos'}
  ];

  tipoProceso: SeletItem[] = [
    {value: '271', viewValue: 'Adjudicación Simplificada'},
    {value: '82', viewValue: 'Licitación Pública'},
    {value: '75', viewValue: 'Concurso Público'},
    {value: '384', viewValue: 'Subasta Inversa Electrónica'},
    {value: '511', viewValue: 'Procedimiento Especial de Contratación'},
    {value: '0', viewValue: 'Todos'}
  ];

  tipoDepartamento: SeletItem[] = [
    {value: '01', viewValue: 'Amazonas'},
    {value: '02', viewValue: 'Ancash'},
    {value: '03', viewValue: 'Apurimac'},
    {value: '04', viewValue: 'Arequipa'},
    {value: '05', viewValue: 'Ayacucho'},
    {value: '06', viewValue: 'Cajamarca'},
    {value: '07', viewValue: 'Callao'},
    {value: '08', viewValue: 'Cusco'},
    {value: '09', viewValue: 'Huancavelica'},
    {value: '10', viewValue: 'Huanuco'},
    {value: '11', viewValue: 'Ica'},
    {value: '12', viewValue: 'Junin'},
    {value: '13', viewValue: 'La Libertad'},
    {value: '14', viewValue: 'Lambayeque'},
    {value: '15', viewValue: 'Lima'},
    {value: '16', viewValue: 'Loreto'},
    {value: '17', viewValue: 'Madre De Dios'},
    {value: '18', viewValue: 'Moquegua'},
    {value: '19', viewValue: 'Pasco'},
    {value: '20', viewValue: 'Piura'},
    {value: '21', viewValue: 'Puno'},
    {value: '22', viewValue: 'San Martin'},
    {value: '23', viewValue: 'Tacna'},
    {value: '24', viewValue: 'Tumbes'},
    {value: '25', viewValue: 'Ucayali'},
    {value: '0', viewValue: 'Todos'}
  ];

  constructor() {}

  ngOnInit() {
    this.oportunidad = new Oportunidad();
    this.oportunidad.codObjeto = '0';
    this.oportunidad.ubigeo = '0';
    this.oportunidad.codTipoProceso = '0';
  }

  busquedaTotal() {
    this.emisor.emit(this.oportunidad);
  }

  busquedaSimple() {
    this.emisor.emit(this.oportunidad);
  }

  limpiar() {
    this.oportunidad = new Oportunidad();
    this.oportunidad.codObjeto = '0';
    this.oportunidad.ubigeo = '0';
    this.oportunidad.codTipoProceso = '0';
    this.oportunidad.detItem = '';
  }

  mensaje(msg: string) {
    Swal.fire(msg);
  }
}