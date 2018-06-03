import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormaPagamentoDetailPage } from './forma-pagamento-detail';

@NgModule({
  declarations: [
    FormaPagamentoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FormaPagamentoDetailPage),
  ],
})
export class FormaPagamentoDetailPageModule {}
