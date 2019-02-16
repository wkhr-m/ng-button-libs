import { Component, ElementRef, HostBinding, Input } from '@angular/core';

@Component({
  selector: '[wmButton]',
  template: `
  <span class="wm-button-label"><ng-content></ng-content></span>
  <div class="wm-ripple" wmRipple [disabled]="disabled"></div>`,
  styleUrls: ['./../../style.scss']
})
export class ButtonDirective {
  @HostBinding('class.wm-button') class = true;
  @Input() disabled: boolean;
  @Input()
  get type() { return this._type; }
  set type(type: string) {
    if (!!type) {
      this.elementRef.nativeElement.classList.add(type);
    }
    if (!!this._type) {
      this.elementRef.nativeElement.classList.remove(this._type);
    }
    this._type = type;
  }
  private _type: string;

  constructor(private elementRef: ElementRef) { }
}
