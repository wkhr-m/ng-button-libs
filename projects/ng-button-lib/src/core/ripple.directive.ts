import { Directive, ElementRef, HostBinding, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { normalizePassiveListenerOptions } from './passive';

@Directive({
  selector: '[wmRipple]',
})
export class RippleDirective implements OnInit, OnDestroy {
  @Input('wmRippleColor') color: string;
  @Input('matRippleDisabled')
  get disabled() { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = value;
  }
  private _disabled: boolean = false;
  @HostBinding('class.wm-ripple') private class: boolean = true;

  passiveEventOptions = normalizePassiveListenerOptions({ passive: true });
  private _triggerEvents = new Map<string, any>();
  private _triggerElement: HTMLElement;
  private _isPointerDown: boolean;

  constructor(private zone: NgZone,
    private elementref: ElementRef<HTMLElement>) { }

  ngOnInit() {
    this._triggerEvents
      .set('click', this.onMousedown)
      .set('mouseup', this.onPointerUp)
      .set('mouseleave', this.onPointerUp);
    this.setupTriggerEvents(this.elementref.nativeElement);
  }

  ngOnDestroy() {
    this._removeTriggerEvents();
  }

  private setupTriggerEvents(element: HTMLElement) {
    if (!element || element === this._triggerElement || this.disabled) {
      return;
    }
    const ripple = document.createElement('div');
    ripple.classList.add('mat-ripple-element');
    ripple.style.position = 'absolute';
    ripple.style.top = '0';
    ripple.style.bottom = '0';
    ripple.style.left = '0';
    ripple.style.right = '0';

    element.appendChild(ripple);

    this.zone.runOutsideAngular(() => {
      this._triggerEvents.forEach((fn, type) => {
        ripple.addEventListener(type, fn, this.passiveEventOptions);
      });
    });

    this._triggerElement = ripple;
  }

  private _removeTriggerEvents() {
    if (this._triggerElement) {
      this._triggerEvents.forEach((fn, type) => {
        this._triggerElement!.removeEventListener(type, fn, this.passiveEventOptions);
      });
    }
  }

  private onMousedown = (event: MouseEvent) => {
    if (!this._triggerElement && this._isPointerDown) {
      this._isPointerDown = true;
      this.fadeInRipple(event.clientX, event.clientY);
    }
  }

  fadeInRipple(x: number, y: number) {
    const containerRect = this.elementref.nativeElement.getBoundingClientRect();

    const radius = this.distanceToFurthestCorner(x, y, containerRect);
    const offsetX = x - containerRect.left;
    const offsetY = y - containerRect.top;
    const duration = 5000;

    const ripple = document.createElement('div');
    ripple.classList.add('mat-ripple-element');

    ripple.style.left = `${offsetX - radius}px`;
    ripple.style.top = `${offsetY - radius}px`;
    ripple.style.height = `${radius * 2}px`;
    ripple.style.width = `${radius * 2}px`;

    // If the color is not set, the default CSS color will be used.
    ripple.style.backgroundColor = null;
    ripple.style.transitionDuration = `${duration}ms`;

    this._triggerElement.appendChild(ripple);

    // By default the browser does not recalculate the styles of dynamically created
    // ripple elements. This is critical because then the `scale` would not animate properly.
    this.enforceStyleRecalculation(ripple);

    ripple.style.transform = 'scale(1)';


    // Wait for the ripple element to be completely faded in.
    // Once it's faded in, the ripple can be hidden immediately if the mouse is released.
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this._triggerElement.removeChild(ripple);
      }, duration);
    });

    return ripple;
  }

  private distanceToFurthestCorner(x: number, y: number, rect: ClientRect) {
    const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
    const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
    return Math.sqrt(distX * distX + distY * distY);
  }

  /** Enforces a style recalculation of a DOM element by computing its styles. */
  private enforceStyleRecalculation(element: HTMLElement) {
    // Enforce a style recalculation by calling `getComputedStyle` and accessing any property.
    // Calling `getPropertyValue` is important to let optimizers know that this is not a noop.
    // See: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
    window.getComputedStyle(element).getPropertyValue('opacity');
  }

  private onPointerUp = () => {
    // if (!this._isPointerDown) {
    //   return;
    // }

    // this._isPointerDown = false;

    // // Fade-out all ripples that are visible and not persistent.
    // this._activeRipples.forEach(ripple => {
    //   // By default, only ripples that are completely visible will fade out on pointer release.
    //   // If the `terminateOnPointerUp` option is set, ripples that still fade in will also fade out.
    //   const isVisible = ripple.state === RippleState.VISIBLE ||
    //     ripple.config.terminateOnPointerUp && ripple.state === RippleState.FADING_IN;

    //   if (!ripple.config.persistent && isVisible) {
    //     ripple.fadeOut();
    //   }
    // });
  }

}
