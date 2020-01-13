import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Oportunidad } from 'src/app/_model/oportunidad';
import { OpnegocioService } from 'src/app/_service/opnegocio.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { ExcelService } from 'src/app/_service/export.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SugerenciaComponent } from '../../sugerencia/sugerencia.component';
import { formatDate } from '@angular/common';


declare const $: any;
@Component({
  selector: 'app-segmento-lista',
  templateUrl: './segmento-lista.component.html',
  styleUrls: ['./segmento-lista.component.css']
})

  export class SegmentoListaComponent  implements OnInit, OnDestroy {

  dataExport: any = [];
  dtHolidays: any;
  codigoSegmento: string;
  mobileQuery: MediaQueryList;
  oportunCount: Oportunidad = new Oportunidad();
  displayedColumns: string[] = ['detEntidad', 'fechaConvocatoria', 'nomenclatura', 'detObjeto', 'sintesisProceso', 'detItem', 'nroItem', 'valorReferencial', 'ficha'];
  displayedColumnsCard: string[] = ['card'];
  dataSource: MatTableDataSource<Oportunidad>;
  dataSourceHidden: MatTableDataSource<Oportunidad>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  countBusqueda: number;
  countBusquedaTotal: string;
  sysdate = formatDate(new Date(), 'dd/MM/yyyy', 'en');

  private _mobileQueryListener: () => void;

  constructor(private opnegocioService: OpnegocioService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private excelService: ExcelService, private router: ActivatedRoute, public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.codigoSegmento = params[`codigoSegmento`];
      this.listarProcesosSegmento(this.codigoSegmento);
    });
    this.opnegocioService.contarTotal().subscribe(data => {
      this.oportunCount = data;
      this.countBusquedaTotal = this.oportunCount.numProceso;
    });
  }

  ngOnDestroy(): void {
// tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  listarProcesosSegmento(id: string){
    this.opnegocioService.listarProcesosSegmento(id).subscribe(data => {
      this.dataExport = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSourceHidden = new MatTableDataSource(data);
      this.countBusqueda = data.length;
      for (const item of data) {
        if (item.sintesisProceso.length > 60) {
          item.sintesisProcesoStr = item.sintesisProceso.substring(0, 60);
        } else {
          item.sintesisProcesoStr = item.sintesisProceso;
        }
        if (item.detItem.length > 60) {
          item.detItemStr = item.detItem.substring(0, 60);
        } else {
          item.detItemStr = item.detItem;
        }
        if (item.valorReferencial === '---' || item.valorReferencial === 'Reservado') {
          item.monedaProceso = '';
        }
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  mensaje(msg: string) {
    Swal.fire(msg);
  }

  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.dataExport);
   }

  exportAsCSV() {
    this.excelService.exportAsCSVFile(this.dataExport);
   }

  openModalSugerencia(){
    this.dialog.open(SugerenciaComponent, {
      disableClose: false
    });
  }
}