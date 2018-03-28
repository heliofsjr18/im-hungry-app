import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'ion-rating',
  templateUrl: 'ion-rating.html',
})
export class IonRatingComponent {

  @Input() numStars: number = 5;
  @Input() rateValue: number = 2.5;
  @Input() showOnly: boolean = false;

  @Output() ionClick: EventEmitter<number> = new EventEmitter<number>();

  stars: string[] = [];

  constructor(private detector: ChangeDetectorRef) {
  }

  ngAfterViewInit(){
    this.setStars();
  }

  setStars(){
    this.stars = [];
    let tmp = this.rateValue;
    for(let i=0; i < this.numStars; i++, tmp--){
      if(tmp >= 1)
        this.stars.push("fas fa-star"); 
      else if(tmp > 0 && tmp < 1)
        this.stars.push("fas fa-star-half");
      else
        this.stars.push("far fa-star");
    }
    this.detector.detectChanges();
  }

  starClicked(index){
    if(!this.showOnly){
      this.rateValue = index + 1;
      this.ionClick.emit(this.rateValue);
      this.setStars();
    }
  }

  logStars(event){
  }

}
