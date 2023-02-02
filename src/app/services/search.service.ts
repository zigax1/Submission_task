import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  search$: BehaviorSubject<string> = new BehaviorSubject<string>('');
}
