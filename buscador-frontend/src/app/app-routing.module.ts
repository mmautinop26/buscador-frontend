import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarComponent } from './_pages/buscar/buscar.component';
import { GeoreferenciacionComponent } from './_pages/georeferenciacion/georeferenciacion.component';
import { FichaComponent } from './_pages/ficha/ficha.component';
import { SimpleComponent } from './_pages/simple/simple.component';
import { SegmentoComponent } from './_pages/segmento/segmento.component';
import { SegmentoListaComponent } from './_pages/segmento/segmento-lista/segmento-lista.component';
import {CdkTableModule} from '@angular/cdk/table';


const routes: Routes = [
  { path: ``, redirectTo: 'georeferenciacion', pathMatch: 'full' },
  { path: `georeferenciacion`, component: GeoreferenciacionComponent},
  { path: `buscar`, component: BuscarComponent},
  { path: `oportunidades/codObjeto/codDepartamento/sintesisProceso/codTipoProceso/
          :codObjeto/:codDepartamento/:sintesisProceso/:codTipoProceso`, component: BuscarComponent},
  { path: ``, component: GeoreferenciacionComponent},
  { path: `descripcion`, component: SimpleComponent},
  { path: `segmento`, component: SegmentoComponent},
  { path: `segmento/segmentoLista/:codigoSegmento`, component : SegmentoListaComponent},
  { path: `ficha/idProceso/:idProceso`, component: FichaComponent},

];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
    CdkTableModule
    ]
})
export class AppRoutingModule { }
