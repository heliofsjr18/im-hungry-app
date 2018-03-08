import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstabelecimentoListPage } from './estabelecimento-list';

@NgModule({
  declarations: [
    EstabelecimentoListPage,
  ],
  imports: [
    IonicPageModule.forChild(EstabelecimentoListPage),
  ],
})
export class EstabelecimentoListPageModule {}
