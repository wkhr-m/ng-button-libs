import { Directive, ElementRef, HostBinding, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[wmButton]'
})
export class ButtonDirective implements OnChanges {
  @HostBinding('class.wm-button') class = true;
  @Input() type: 'primary' | 'warn' | 'accent';
  @Input() disable: boolean;

  _type: string;

  constructor(private elementRef: ElementRef,
    private renderer: Renderer2) { }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['type'] && this.type !== this._type) {
      if (!!this.type) {
        this.elementRef.nativeElement.classList.add(this.type);
      }
      if (!!this._type) {
        this.elementRef.nativeElement.classList.remove(this._type);
      }
      this._type = this.type;
    }
  }
}
