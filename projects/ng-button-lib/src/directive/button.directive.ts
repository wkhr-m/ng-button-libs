import { Directive, ElementRef, HostBinding, OnInit } from '@angular/core';

@Directive({
  selector: '[wmButton]'
})
export class ButtonDirective implements OnInit {

  @HostBinding('class.wm-button') private button = true;


  @HostBinding('class') private class = 'wm-button';

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    (this.elementRef.nativeElement as HTMLElement).classList.add('wm-button');
  }
}
