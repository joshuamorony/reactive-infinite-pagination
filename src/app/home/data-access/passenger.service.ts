import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  #pageSize = 15;

  constructor(private http: HttpClient) {}

  getPassengerData(page: number) {
    return this.http
      .get(
        `https://www.reddit.com/r/gifs/hot/.json?limit=${page * this.#pageSize}`
      )
      .pipe(map((res: any) => res.data.children));
  }
}
