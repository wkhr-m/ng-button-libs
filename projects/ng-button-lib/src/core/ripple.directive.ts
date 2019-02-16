import { animate, AnimationBuilder, style } from '@angular/animations';
import { Directive, ElementRef, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { normalizePassiveListenerOptions } from './passive';

@Directive({
  selector: '[wmRipple]',
})
export class RippleDirective implements OnInit, OnDestroy {
  @Input('wmRippleColor') color: string;
  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = value;
  }
  private _disabled: boolean = false;

  passiveEventOptions = normalizePassiveListenerOptions({ passive: true });
  private _triggerEvents = new Map<string, any>();

  constructor(private zone: NgZone,
    private elementref: ElementRef<HTMLElement>,
    private animeBuilder: AnimationBuilder) { }

  ngOnInit() {
    this._triggerEvents
      .set('click', this.onMousedown);
    this.setupTriggerEvents(this.elementref.nativeElement);
  }

  ngOnDestroy() {
    this._removeTriggerEvents();
  }

  private setupTriggerEvents(element: HTMLElement) {
    if (!element || this.disabled) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      this._triggerEvents.forEach((fn, type) => {
        this.elementref.nativeElement.addEventListener(type, fn, this.passiveEventOptions);
      });
    });

  }

  private _removeTriggerEvents() {
    if (this.elementref) {
      this._triggerEvents.forEach((fn, type) => {
        this.elementref.nativeElement!.removeEventListener(type, fn, this.passiveEventOptions);
      });
    }
  }

  private onMousedown = (event: MouseEvent) => {
    if (!this.disabled) {
      this.fadeInRipple(event.clientX, event.clientY);
    }
  }

  fadeInRipple(x: number, y: number) {
    const containerRect = this.elementref.nativeElement.getBoundingClientRect();

    const radius = this.distanceToFurthestCorner(x, y, containerRect);
    const offsetX = x - containerRect.left;
    const offsetY = y - containerRect.top;
    const duration = 500;

    const ripple = document.createElement('div');
    ripple.classList.add('wm-ripple-effect');
    ripple.style.position = `absolute`;
    ripple.style.left = `${offsetX - radius}px`;
    ripple.style.top = `${offsetY - radius}px`;
    ripple.style.height = `${radius * 2}px`;
    ripple.style.width = `${radius * 2}px`;
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(256,256,256, 1)';

    this.elementref.nativeElement.appendChild(ripple);
    const animation = this.animeBuilder.build([
      style({ opacity: 0.5, transform: 'scale(.3)' }),
      animate(duration, style({ opacity: 0.1, transform: 'scale(2)' }))
    ]).create(ripple);

    animation.play();

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.elementref.nativeElement.removeChild(ripple);
      }, duration);
    });

    return ripple;
  }

  private distanceToFurthestCorner(x: number, y: number, rect: ClientRect) {
    const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
    const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
    return Math.sqrt(distX * distX + distY * distY);
  }

}
