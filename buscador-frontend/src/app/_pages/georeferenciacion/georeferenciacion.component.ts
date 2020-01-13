import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { Oportunidad } from 'src/app/_model/oportunidad';
import { OpnegocioService } from 'src/app/_service/opnegocio.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { ExcelService } from 'src/app/_service/export.service';
import { MatDialog } from '@angular/material';
import { SugerenciaComponent } from '../sugerencia/sugerencia.component';
import {formatDate} from '@angular/common';
import { OportunidadCSV } from '../../_model/oportunidad-csv'

declare const $: any;
declare const echarts: any;
declare const jvm: any;


@Component({
  selector: 'app-georeferenciacion',
  templateUrl: './georeferenciacion.component.html',
  styleUrls: ['./georeferenciacion.component.css']
})
export class GeoreferenciacionComponent implements OnInit, AfterViewInit, OnDestroy {

  mobileQuery: MediaQueryList;
  displayedColumns: string[] = ['detEntidad', 'fechaConvocatoria', 'nomenclatura', 'detObjeto', 'sintesisProceso', 'detItem', 'nroItem', 'valorReferencial', 'ficha'];
  displayedColumnsCard: string[] = ['card'];
  dataSource: MatTableDataSource<Oportunidad>;
  oportun: Oportunidad = new Oportunidad();
  oportunCount: Oportunidad = new Oportunidad();
  nroBienes = 0;
  nroServicios = 0;
  nroObras = 0;
  nroConsultorias = 0;
  breakpoint: number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  viewDepartamento: string;
  countBusqueda: number;
  dataExport: any = [];
  listadoCSV: OportunidadCSV[];
  countBusquedaTotal: string;
  sysdate = formatDate(new Date(), 'dd/MM/yyyy', 'en');
  loading = false;

  private _mobileQueryListener: () => void;

  constructor(private opnegocioService: OpnegocioService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private excelService: ExcelService, public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 500px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 2;
    this.opnegocioService.contarTotal().subscribe(data => {
      this.oportunCount = data;
      this.countBusquedaTotal = this.oportunCount.numProceso;
    });
  }

  onResize( event ) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 2;
  }

  ngAfterViewInit() {
    const self = this;
    const mapa = new jvm.Map({
    container: $('#world-map'),
    map: 'seace_map',
    backgroundColor: '#FFFFFF',
    regionsSelectableOne: true,
    regionsSelectable: true,
    zoomOnScroll: false,
    regionStyle: {
      initial: {
        fill: '#3A6B82'
      },
      selected: {
        fill: '#F28530'
      }
    },
      onRegionClick(event, code) {
        this.viewDepartamento = mapa.getRegionName(code).toUpperCase();
        self.cargarDatatable(code, mapa.getRegionName(code));
      }
    });
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  cargarDatatable(codDepartamento: string, departamento: string) {
    this.loading = true;
    this.oportun.codObjeto = '0';
    this.oportun.ubigeo = codDepartamento;
    this.oportun.codTipoProceso = '0';

    this.opnegocioService.listar(this.oportun).subscribe(data => {
      this.loading = false;
      this.dataExport = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.viewDepartamento = departamento.toUpperCase();
      this.nroBienes = 0;
      this.nroConsultorias = 0;
      this.nroObras = 0;
      this.nroServicios = 0;
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
        if (item.codObjeto === '62') {
          this.nroBienes++;
        }
        if (item.codObjeto === '63') {
          this.nroConsultorias++;
        }
        if (item.codObjeto === '64') {
          this.nroObras++;
        }
        if (item.codObjeto === '65') {
          this.nroServicios++;
        }
        if (item.valorReferencial === '---' || item.valorReferencial === 'Reservado') {
          item.monedaProceso = '';
        }
      }
      this.countBusqueda = data.length;
      this.cargarChart();
    });
  }

  cargarChart() {
    const self = this;
    $(function() {
      let basicpieChart = echarts.init(document.getElementById('basic-pie'));
      const option = {
                   title: {
                       text: '',
                       subtext: '',
                       x: 'center'
                   },
                   tooltip: {
                       trigger: 'item',
                       formatter: '{a} <br/>{b}: {c} ({d}%)'
                   },
                   legend: {
                       orient: 'vertical',
                       x: 'left',
                       data: ['Bienes', 'Servicios', 'Obras', 'Consultorias']
                   },
                   color: ['#ffbc34', '#4fc3f7', '#212529', '#2962FF'],
                   toolbox: {
                       show: true,
                       orient: 'vertical',
                       feature: {
                           mark: {
                               show: true,
                               title: {
                                   mark: 'Markline switch',
                                   markUndo: 'Undo markline',
                                   markClear: 'Clear markline'
                               }
                           },
                           dataView: {
                               show: true,
                               readOnly: false,
                               title: 'View data',
                               lang: ['View chart data', 'Close', 'Update']
                           },
                           magicType: {
                               show: true,
                               title: {
                                   pie: 'Switch to pies',
                                   funnel: 'Switch to funnel',
                               },
                               type: ['pie', 'funnel'],
                               option: {
                                   funnel: {
                                       x: '25%',
                                       y: '20%',
                                       width: '50%',
                                       height: '70%',
                                       funnelAlign: 'left',
                                       max: 1548
                                   }
                               }
                           },
                           restore: {
                               show: true,
                               title: 'Restore'
                           },
                           saveAsImage: {
                               show: true,
                               title: 'Same as image',
                               lang: ['Save']
                           }
                       }
                   },
                   calculable: true,
                   series: [{
                       name: 'Objeto',
                       type: 'pie',
                       radius: '70%',
                       center: ['50%', '57.5%'],
                       data: [
                           {value: self.nroBienes, name: 'Bienes'},
                           {value: self.nroServicios, name: 'Servicios'},
                           {value: self.nroObras, name: 'Obras'},
                           {value: self.nroConsultorias, name: 'Consultorias'}
                       ]
                   }]
           };

      basicpieChart.setOption(option);
      basicpieChart.on('click', function(params) {
             if (params.name === 'Bienes') {
              self.oportun.codObjeto = '62';
             }
             if (params.name === 'Servicios') {
              self.oportun.codObjeto = '65';
             }
             if (params.name === 'Obras') {
              self.oportun.codObjeto = '64';
             }
             if (params.name === 'Consultorias') {
              self.oportun.codObjeto = '63';
             }
             self.cargarDatatableObjeto(self.oportun.ubigeo, self.oportun.codObjeto);
           });
     });
  }

  cargarDatatableObjeto(codDepartamento: string, codObjeto: string) {
    this.oportun.codObjeto = codObjeto;
    this.oportun.ubigeo = codDepartamento;
    this.oportun.codTipoProceso = '0';
    this.loading = true;
    this.opnegocioService.listar(this.oportun).subscribe(data => {
      this.loading = false;
      this.dataExport = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.countBusqueda = data.length;
      for (const item of data) {
        if (item.sintesisProceso.length > 60) {
          item.sintesisProcesoStr = item.sintesisProceso.substring(0, 60);
        } else {
          item.sintesisProcesoStr = item.sintesisProceso;
        }
        if (item.detItem.length > 60) {
          item.detItemStr = item.detItem.substring(0, 60);
        }
        if (item.valorReferencial === '---' || item.valorReferencial === 'Reservado') {
          item.monedaProceso = '';
        }
      }
    });
  }

  busquedaFiltros(oportunidad: Oportunidad) {
    this.opnegocioService.listar(oportunidad).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
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
    this.refactorizarJSON();
    this.excelService.exportAsCSVFile(this.listadoCSV);
   }

   openModalSugerencia() {
     this.dialog.open(SugerenciaComponent, {
       disableClose: false
     });
   }

   refactorizarJSON() {
    this.listadoCSV = [];
    for (const item of this.dataExport) {
      const csv = new OportunidadCSV();
      csv.detEntidad = item.detEntidad;
      csv.detTipoProceso = item.detTipoProceso;
      csv.detModalidadSeleccion = item.detModalidadSeleccion;
      csv.numProceso = item.numProceso;
      csv.anhoProceso = item.anhoProceso;
      csv.siglasProceso = item.siglasProceso;
      csv.sintesisProceso = item.sintesisProceso;
      csv.nomenclatura = item.nomenclatura;
      csv.detObjeto = item.detObjeto;
      csv.valorReferencial = item.valorReferencial;
      csv.monedaProceso = item.monedaProceso;
      csv.fechaConvocatoria = item.fechaConvocatoria;
      csv.fechaInicio = item.fechaInicio;
      csv.fechaFin = item.fechaFin;
      csv.fechaPresentacionPropuestas = item.fechaPresentacionPropuestas;
      csv.fecInicioParticipantes = item.fecInicioParticipantes;
      csv.fecFinParticipantes = item.fecFinParticipantes;
      csv.reiniciadoDesde = item.reiniciadoDesde;
      csv.documentoBase = item.documentoBase;
      csv.nroItem = item.nroItem;
      csv.detItem = item.detItem;
      csv.cantItem = item.cantItem;
      csv.detUnidadMedida = item.detUnidadMedida;
      csv.detMonedaItem = item.detMonedaItem;
      csv.tipoCambio = item.tipoCambio;
      csv.valorReferencialItem = item.valorReferencialItem;
      csv.tipoItem = item.tipoItem;
      this.listadoCSV.push(csv);
    }
   }
}
