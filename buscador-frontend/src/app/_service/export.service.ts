import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  constructor() { }

  public exportAsExcelFile(json: any[]): void {
    const newArray: any[] = [];
    const data = Object.values(json);
    Object.keys(data).forEach((key, index) => {
      newArray.push({
        'Nombre Entidad': data[key].detEntidad,
        'Tipo proceso': data[key].detTipoProceso,
        'Modalidad de seleccion': data[key].detModalidadSeleccion,
        'Numero de proceso': data[key].numProceso,
        'Año del proceso': data[key].anhoProceso,
        'Siglas del proceso': data[key].siglasProceso,
        'Sintesis del proceso': data[key].sintesisProceso,
        'Nomenclatura del proceso': data[key].nomenclatura,
        'Detalle del objeto': data[key].detObjeto,
        'Valor referencial': data[key].valorReferencial,
        'Moneda del proceso': data[key].monedaProceso,
        'Fecha de la convocatoria': data[key].fechaConvocatoria,
        'Fecha de inicio de registro de participantes': data[key].fecInicioParticipantes,
        'Fecha de Fin de registro de participantes': data[key].fecFinParticipantes,
        'Fecha de presentacion de propuestas': data[key].fechaPresentacionPropuestas,
        'Reiniciado desde': data[key].reiniciadoDesde,
        'Ruta del documento de la base': data[key].documentoBase,
        'Numero de item': data[key].nroItem,
        'Detalle del item': data[key].detItem,
        'Codigo del CUBSO': data[key].codCubso,
        'Detalle del CUBSO': data[key].detCubso,
        'Cantidad de item': data[key].cantItem,
        'Unidad de medida': data[key].detUnidadMedida,
        'Detalle de la moneda': data[key].detMonedaItem,
        'Tipo de cambio': data[key].tipoCambio,
        'Valor referencial del item': data[key].valorReferencialItem,
        'Tipo de item': data[key].tipoItem
      });
    });
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(newArray);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer);
  }

  public saveAsExcelFile(buffer: any): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, 'opnegocio_export_excel_' + new  Date().getTime() + EXCEL_EXTENSION);
  }

  public exportAsCSVFile(dataExport: any): void {
    const csvOptions = {
      fieldSeparator: '|',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      useBom: true,
      noDownload: false,
      headers: ['Nombre Entidad',
        'Tipo proceso',
        'Modalidad de seleccion',
        'Numero de proceso',
        'Año del proceso',
        'Siglas del proceso',
        'Sintesis del proceso',
        'Nomenclatura del proceso',
        'Detalle del objeto',
        'Valor referencial',
        'Moneda del proceso',
        'Fecha de la convocatoria',
        'Fecha de inicio de registro de participantes',
        'Fecha de Fin de registro de participantes',
        'Fecha de inicio de registro de participantes',
        'Fecha de Fin de registro de participantes',
        'Fecha de presentacion de propuestas',
        'Reiniciado desde',
        'Ruta del documento de la base',
        'Numero de item',
        'Detalle del item',
        'Codigo del CUBSO',
        'Detalle del CUBSO',
        'Cantidad de item',
        'Unidad de medida',
        'Detalle de la moneda',
        'Tipo de cambio',
        'Valor referencial del item',
        'Tipo de item']
    };
    new  AngularCsv (dataExport, 'opnegocio_export_csv_' + new  Date().getTime(), csvOptions);
  }


}
