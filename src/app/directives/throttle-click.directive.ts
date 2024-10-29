import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[appThrottleClick]'
})
export class ThrottleClickDirective implements OnInit, OnDestroy {
  @Input() throttleTime = 700;
  @Output() throttleClick = new EventEmitter();
  private onDestroy$ = new Subject<void>();
  private clicks = new Subject();

  constructor() { }

  @HostListener('click', ['$event'])
  clickEvent(event): void {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }

  ngOnInit(): void {
    this.clicks.pipe(
      takeUntil(this.onDestroy$),
      throttleTime(this.throttleTime)
    ).subscribe(e => this.throttleClick.emit(e));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
