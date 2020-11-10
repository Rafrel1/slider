/**
 * The need for a service only to increment or decrement the display index of
 * the slider is questionable. This service is more like a demonstration.
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SliderService {

  constructor() { }

  next = (index:number, length:number) => {
    if (index >= length-1){
      index = 0;
    } else {
      index++;
    }
    
    return (index);
  }

  prev = (index:number, length:number) => {
    if (index <= 0){
      index = length-1;
    } else {
      index--;
    }
    
    return (index);
  }
}
