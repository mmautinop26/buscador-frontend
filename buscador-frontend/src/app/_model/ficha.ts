import { Cronograma } from './cronograma';
import { Entidad } from './entidad';
import { Documento } from './documento';
import { Item } from './item';

export class Ficha {

nidExpediente: string;

nidConvocatoria: string;

nomenclatura: string;

numeroConvocatoria: string;

tipoCompra: string;

normativaAplica: string;

tipoObjeto: string;

descripcionObjeto: string;

descripcionObjetoResumen: string;

valorReferencial: string;

costoBases: string;

codMonedaBases: string;

desMonedaBases: string;

fechaPublicacion: string;

lugarPago: string;

numeroCuenta: string;

numeroProcedimiento: string;

nTipoCompra: string;

modalidadSeleccion: string;

iBase: string;

version: string;

idNormativaAplicable: string;

flagValorEstimado: string;

tipoLey: string;

fechaCreacion: string;

listaCronograma: Cronograma[];

entidadConvocante: Entidad;

listaEntidadesContratantes: Entidad[];

idConvocatoriaPub: string;

listaDocumentos: Documento[];

listaItems: Item[];
}
