import { Injectable } from '@angular/core';

@Injectable()
export class MenuFilterProvider {

  constructor() {
    
  }

  private estabList_Filters = {
    apenasProximos: false,
    apenasFidelidade: false
  }

  /**
   * Obter os filtros da página de listagem de estabelecimentos
   */
  getEstabListFilters(){
    return this.estabList_Filters;
  }

  setEstabListFilters(filters){
    this.estabList_Filters = filters;
  }

  /**
   * Se 'true' só irá mostrar foodtrucks com distância < 10km.
   */
  public apenasFoodTrucksProximos: boolean = false; 
   /**
    * Se 'true' só irá mostrar foodtrucks que suportam cartão fidelidade.
    */
  public apenasFoodTrucksFidelidade: boolean = false;

}
