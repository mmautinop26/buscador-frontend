import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Oportunidad } from 'src/app/_model/oportunidad';
import { OpnegocioService } from 'src/app/_service/opnegocio.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { ActivatedRoute, Params } from '@angular/router';
import { Ficha } from 'src/app/_model/ficha';
import { Entidad } from 'src/app/_model/entidad';
import { SugerenciaComponent } from '../sugerencia/sugerencia.component';
import { MatDialog } from '@angular/material';


declare const $: any;

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit, OnDestroy {

  ficha: Ficha;
  dominioDocumento = 'http://prodapp.seace.gob.pe/SeaceWeb-PRO/SdescargarArchivoAlfresco?fileCode=';

  mobileQuery: MediaQueryList;
  dataSource: MatTableDataSource<Oportunidad>;
  dataSourceHidden: MatTableDataSource<Oportunidad>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  private _mobileQueryListener: () => void;

  constructor(private opnegocioService: OpnegocioService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: ActivatedRoute, public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    let idProceso: string;
    this.router.params.subscribe((params: Params) => {
    idProceso = params[`idProceso`];
    this.cargarFicha(idProceso);
    });
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  cargarFicha(idProceso: string){
    this.ficha = new Ficha();
    this.ficha.entidadConvocante = new Entidad();
    this.opnegocioService.verFichaProceso(idProceso).subscribe(data => {
      this.ficha = data;
    });
  }

  mensaje(msg: string) {
    Swal.fire(msg);
  }

  openModalSugerencia() {
    this.dialog.open(SugerenciaComponent, {
      disableClose: false
    });
  }

}