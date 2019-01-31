import { Directive, ElementRef, HostBinding, Input, NgZone, OnInit } from '@angular/core';

@Directive({
  selector: '[wmRipple]',
})
export class RippleDirective implements OnInit {
  @Input('wmRippleColor') color: string;
  @Input('matRippleDisabled')
  get disabled() { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = value;
  }
  private _disabled: boolean = false;
  @HostBinding('class.wm-ripple') private class: boolean = true;

  private _triggerEvents = new Map<string, any>();
  private _triggerElement: HTMLElement;

  constructor(private zone: NgZone,
    private elementref: ElementRef<HTMLElement>) { }

  ngOnInit() {

    this._triggerEvents
      .set('mousedown', this.onMousedown)
      .set('mouseup', this.onPointerUp)
      .set('mouseleave', this.onPointerUp);
  }

  private setupTriggerEvents(element: HTMLElement) {
    if (!element || element === this._triggerElement) {
      return;
    }
    this._removeTriggerEvents();

    this.zone.runOutsideAngular(() => {
      this._triggerEvents.forEach((fn, type) => {
        element.addEventListener(type, fn, passiveEventOptions);
      });
    });

    this._triggerElement = element;
  }

  private _removeTriggerEvents() {
    if (this._triggerElement) {
      this._triggerEvents.forEach((fn, type) => {
        this._triggerElement!.removeEventListener(type, fn, passiveEventOptions);
      });
    }
  }

  private onMousedown = (event: MouseEvent) => {
    // Screen readers will fire fake mouse events for space/enter. Skip launching a
    // ripple in this case for consistency with the non-screen-reader experience.
    //   const isFakeMousedown = isFakeMousedownFromScreenReader(event);
    //   const isSyntheticEvent = this._lastTouchStartEvent &&
    //       Date.now() < this._lastTouchStartEvent + ignoreMouseEventsTimeout;

    //   if (!this._target.rippleDisabled && !isFakeMousedown && !isSyntheticEvent) {
    //     this._isPointerDown = true;
    //     this.fadeInRipple(event.clientX, event.clientY, this._target.rippleConfig);
    //   }
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

/** Options that apply to all the event listeners that are bound by the ripple renderer. */
const passiveEventOptions = normalizePassiveListenerOptions({ passive: true });

/** Cached result of whether the user's browser supports passive event listeners. */
let supportsPassiveEvents: boolean;

/**
 * Checks whether the user's browser supports passive event listeners.
 * See: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
 */
export function normalizePassiveListenerOptions(options: AddEventListenerOptions): AddEventListenerOptions | boolean {
  return supportsPassiveEventListeners() ? options : !!options.capture;
}

/**
 * Normalizes an `AddEventListener` object to something that can be passed
 * to `addEventListener` on any browser, no matter whether it supports the
 * `options` parameter.
 * @param options Object to be normalized.
 */
export function supportsPassiveEventListeners(): boolean {
  if (supportsPassiveEvents == null && typeof window !== 'undefined') {
    try {
      window.addEventListener('test', null!, Object.defineProperty({}, 'passive', {
        get: () => supportsPassiveEvents = true
      }));
    } finally {
      supportsPassiveEvents = supportsPassiveEvents || false;
    }
  }

  return supportsPassiveEvents;
}
