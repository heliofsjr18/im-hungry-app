import { Component, ViewChild, OnInit, Renderer, Input } from '@angular/core';

@Component({
  selector: 'accordion',
  templateUrl: 'accordion.html'
})
export class AccordionComponent implements OnInit {

  @Input('first-title') first_title: string;
  @Input('second-title') second_title: string;
  @Input('image-path') image_path: string;
  @ViewChild('cc') cardContent: any;
  accordionExpanded = false;

  constructor(public renderer: Renderer) {
  }

  ngOnInit(){
    this.renderer.setElementStyle(this.cardContent.nativeElement, "transition", "max-height 500ms, padding 500ms");
  }

  toggleAccordion(){
    if(this.accordionExpanded){
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "0px 16px");
    }else{
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "1000px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "13px 16px");
    }
    this.accordionExpanded = !this.accordionExpanded;
  }

}
