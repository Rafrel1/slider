import { Component, OnInit, Input } from '@angular/core';
import { SliderService } from '../slider.service';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, query, style, animate, group } from '@angular/animations';

/** Description for animation direction left */
const left = [
  query(':enter, :leave', style({ position: 'fixed' })),
  group([
    /**
     * Enter animation starts at X-position -100% and moves to X-position 0% in 0.3 seconds.
     * Also fades from transparent to solid in the same time
     */
    query(':enter', [
      style({ transform: 'translateX(-100%)', opacity: 0 }),
      animate('.3s ease-out', style({ transform: 'translateX(0%)', opacity: 1 }))
    ], { optional: true }),
    /**
     * Leave animation starts at X-position 0% and moves to X-position 100% in 0.3 seconds.
     * Also fades from transparent to solid in the same time
     */
    query(':leave', [
      style({ transform: 'translateX(0%)', opacity: 1 }),
      animate('.3s ease-out', style({ transform: 'translateX(100%)', opacity: 0 }))
    ], { optional: true }),
  ]),
];

/** Description for animation direction right */
const right = [
  query(':enter, :leave', style({ position: 'fixed' }), { optional: true }),
  group([
    /**
     * Enter animation starts at X-position 100% and moves to X-position 0% in 0.3 seconds.
     * Also fades from transparent to solid in the same time
     */
    query(':enter',
      [style({ transform: 'translateX(100%)', opacity: 0 }),
      animate('.3s ease-out', style({ transform: 'translateX(0%)', opacity: 1 }))
      ], { optional: true }),
      /**
     * Leave animation starts at X-position 0% and moves to X-position -100% in 0.3 seconds.
     * Also fades from transparent to solid in the same time
     */
    query(':leave', [
      style({ transform: 'translateX(0%)', opacity: 1 }),
      animate('.3s ease-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
    ], { optional: true }),
  ]),
];


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  animations: [
    /** Animation will be trigger when the direction variable is incremented or decremented */
    trigger('animPictureSlider', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ]
})
export class SliderComponent implements OnInit {
  @Input() pictureList: any[];
  @Input() autoSlide: boolean;

  constructor(
    private service: SliderService
  ) { }

  display: number = 0;    //Indicator for the shown picture
  interval;               //Interval for the five second timer
  direction: number = 0;  //Helper for animation direction
  faCaretRight = faCaretRight;
  faCaretLeft = faCaretLeft;

  next = (index: number) => {
    this.display = this.service.next(index, this.pictureList.length);
    this.direction++;
  }

  prev = (index: number) => {
    this.display = this.service.prev(index, this.pictureList.length);
    this.direction--;
  }

  ngOnInit(): void {
    if (this.autoSlide) {
      this.interval = setInterval(() => {
        this.next(this.display);
      }, 5000)
    }
  }

}
