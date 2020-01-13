import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

    readonly servNotOpNegociosBck: string = 'http://190.216.169.243';
    //readonly servNotOpNegociosBck: string = 'http://localhost';
    readonly portNotOpNegociosBck: string = '8081';

  readonly baseNotOpNegociosBckUrl: string = this.servNotOpNegociosBck + ':' + this.portNotOpNegociosBck;

  readonly apiOportunidadNegocioBckUrl: string = this.baseNotOpNegociosBckUrl + '/api/oportunidades';

  readonly apiSugerenciaBckUrl: string = this.baseNotOpNegociosBckUrl + '/api/sugerencias';
}
