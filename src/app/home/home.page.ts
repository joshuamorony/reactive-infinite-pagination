import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PassengerService } from './data-access/passenger.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentPage$ = new BehaviorSubject<number>(1);
  #currentInfiniteEvent: InfiniteScrollCustomEvent;

  currentPageData$ = this.currentPage$.pipe(
    switchMap((currentPage) =>
      this.passengerService.getPassengerData(currentPage)
    ),
    tap(() => {
      if (this.#currentInfiniteEvent) {
        this.#currentInfiniteEvent.target.complete();
        this.#currentInfiniteEvent = null;
      }
    })
  );

  constructor(private passengerService: PassengerService) {}

  loadData(event: Event) {
    this.#currentInfiniteEvent = event as InfiniteScrollCustomEvent;
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  trackByFn(index: number, element: any) {
    return element.data.id;
  }
}
