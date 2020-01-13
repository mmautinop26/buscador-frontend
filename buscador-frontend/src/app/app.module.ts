import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuscarComponent } from './_pages/buscar/buscar.component';
import { HttpClientModule } from '@angular/common/http';
import { TemplateComponent } from './_pages/template/template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeoreferenciacionComponent } from './_pages/georeferenciacion/georeferenciacion.component';
import { FichaComponent } from './_pages/ficha/ficha.component';
import { MaterialModule } from './_material/material.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SimpleComponent } from './_pages/simple/simple.component';
import { SegmentoComponent } from './_pages/segmento/segmento.component';
import { SegmentoListaComponent } from './_pages/segmento/segmento-lista/segmento-lista.component';
import { SugerenciaComponent } from './_pages/sugerencia/sugerencia.component';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [
    AppComponent,
    BuscarComponent,
    TemplateComponent,
    GeoreferenciacionComponent,
    FichaComponent,
    SimpleComponent,
    SegmentoComponent,
    SegmentoListaComponent,
    SugerenciaComponent,
  ],
  entryComponents: [SugerenciaComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
