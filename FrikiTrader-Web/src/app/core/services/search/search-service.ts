import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTerm = new BehaviorSubject<string>('');
  currentSearch = this.searchTerm.asObservable();

  updateSearch(term: string) {
    this.searchTerm.next(term);
  }
  
}
