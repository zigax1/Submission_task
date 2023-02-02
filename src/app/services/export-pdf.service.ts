import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExportPdfService {
  exportPdf$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
