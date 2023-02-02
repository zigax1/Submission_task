import { Component } from '@angular/core';
import { ExportPdfService } from 'src/app/services/export-pdf.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss'],
})
export class SubmissionsComponent {
  search = '';

  // Booleans
  showIcon = false;
  showMap = false;
  showList = true;

  constructor(
    private searchService: SearchService,
    private exportPdfService: ExportPdfService
  ) {}

  onClickIcon() {
    this.showIcon = false;
    this.search = '';
    this.searchService.search$.next(this.search);
  }

  onChange() {
    this.searchService.search$.next(this.search);
    if (this.search) {
      this.showIcon = true;
    } else {
      this.showIcon = false;
    }
  }

  clickMap() {
    if (this.showMap) return;
    this.showMap = true;
    this.showList = !this.showList;
  }

  clickList() {
    if (this.showList) return;
    this.showList = true;
    this.showMap = !this.showMap;
  }

  clickExport(): void {
    this.exportPdfService.exportPdf$.next(true);
  }
}
