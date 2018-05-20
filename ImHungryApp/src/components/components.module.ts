import { NgModule } from '@angular/core';
import { IonRatingComponent } from './ion-rating/ion-rating';
import { AccordionComponent } from './accordion/accordion';
@NgModule({
	declarations: [IonRatingComponent,
    AccordionComponent],
	imports: [],
	exports: [IonRatingComponent,
    AccordionComponent]
})
export class ComponentsModule {}
