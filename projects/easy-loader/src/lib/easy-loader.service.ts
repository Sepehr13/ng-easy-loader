import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';

@Injectable({
  providedIn: 'platform'
})
export class EasyLoaderService {

  private events$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor() {}

  get allEvents(): Observable<string[]> {
    return this.events$.asObservable();
  }

  addSlug(slug: string): void {
    this.allEvents.pipe(take(1)).subscribe(events => {
      const list = events;
      if (!list.includes(slug) && list.every(p => !p.startsWith(slug))) {
        list.push(slug);
        this.events$.next(list);
      }
    });
  }

  deleteSlug(slug: string): void {
    this.allEvents.pipe(take(1)).subscribe(events => {
      this.events$.next(events.filter(p => p != slug));
    });
  }

  addGroupSlugs(slugs: string[]): void {
    this.allEvents.pipe(take(1)).subscribe(events => {
      this.events$.next([ ...events, ...slugs ]);
    });
  }

  deletePendingSlugs(functionName: string): void {
    this.allEvents.pipe(take(1)).subscribe(events => {
      this.events$.next(events.filter(p => !(p.includes(functionName) && !p.includes(':'))));
    });
  }

  deleteFinishedSlugs(states: string[]): void {
    this.allEvents.pipe(take(1)).subscribe(events => {
      const eventsWithSign = events.filter(p => p.includes('$')).map(m => m.split(':')[0]);
      this.events$.next([...events.filter(p => !states.includes(p)), ...eventsWithSign]);
    });
  }
}
