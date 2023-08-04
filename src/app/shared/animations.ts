import { trigger, transition, animate, keyframes, style } from '@angular/animations';

export const toastrAnimation = trigger('toastrAnimate', [
  transition(':enter', [
    animate(
      '5000ms ease-in',
      keyframes([
        style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
        style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
        style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 }),
      ])
    ),
  ]),
  transition(':leave', [
    animate(
      '5000ms ease-out',
      keyframes([
        style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
        style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
        style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 }),
      ])
    ),
  ])
]);