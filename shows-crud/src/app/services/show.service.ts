import { Injectable } from '@angular/core';
import { Show } from '../models/show';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  private shows: Show[] = [];
  private showsSubject = new BehaviorSubject<Show[]>([]);
  private currentId = 1;

  constructor() {}

  getShows(): Observable<Show[]> {
    return this.showsSubject.asObservable();
  }

  addShow(show: Omit<Show, 'id'>): void {
    const newShow = { ...show, id: this.currentId++ };
    this.shows.push(newShow);
    this.showsSubject.next([...this.shows]);
  }

  updateShow(show: Show): void {
    const index = this.shows.findIndex(s => s.id === show.id);
    if (index !== -1) {
      this.shows[index] = show;
      this.showsSubject.next([...this.shows]);
    }
  }

  deleteShow(id: number): void {
    this.shows = this.shows.filter(show => show.id !== id);
    this.showsSubject.next([...this.shows]);
  }
}