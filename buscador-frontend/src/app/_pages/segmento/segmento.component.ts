import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { OpnegocioService } from 'src/app/_service/opnegocio.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { ExcelService } from 'src/app/_service/export.service';
import { OportunidadNegocioCubso } from 'src/app/_model/oportunidad-negocio-cubso';
import { MatDialog } from '@angular/material';
import { SugerenciaComponent } from '../sugerencia/sugerencia.component';
import { formatDate } from '@angular/common';


declare const $: any;
@Component({
  selector: 'app-segmento',
  templateUrl: './segmento.component.html',
  styleUrls: ['./segmento.component.css']
})
export class SegmentoComponent  implements OnInit, OnDestroy {

  dataExport: any = [];

  mobileQuery: MediaQueryList;
  displayedColumns: string[] = ['codigoSegmento', 'tituloSegmento', 'cantidadProcesos', 'seleccionar'];
  dataSource: MatTableDataSource<OportunidadNegocioCubso>;
  dataSourceHidden: MatTableDataSource<OportunidadNegocioCubso>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private _mobileQueryListener: () => void;
  sysdate = formatDate(new Date(), 'dd/MM/yyyy', 'en');


  constructor(private opnegocioService: OpnegocioService, changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher, private excelService: ExcelService, public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
// tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.opnegocioService.listaSegmentoCubso().subscribe(data => {
      this.dataExport = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSourceHidden = new MatTableDataSource(data);
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
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

  exportAsXLSX(): void {
   this.excelService.exportAsExcelFile(this.dataExport);
  }

  openModalSugerencia(){
    this.dialog.open(SugerenciaComponent, {
      disableClose: false
    });
  }
}