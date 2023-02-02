import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubmissionTask } from 'src/app/models/SubmissionTask';
import { ApiService } from 'src/app/services/api.service';
import { SearchService } from 'src/app/services/search.service';
import { SubmissionsService } from 'src/app/services/submissions.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ExportPdfService } from 'src/app/services/export-pdf.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  submissionsList: SubmissionTask[] = [];
  submissionsToShow: SubmissionTask[] = [];
  submissionsLen!: number;

  isLoaded = false;
  allChecked = false;

  search = '';

  private submissionTasksSubs: Subscription = new Subscription();

  //pagination
  activePage = 1;
  entriesToShow = 9;
  pagesToShowAroundActive = 1;
  prevText = '<';
  nextText = '>';
  containersToShow!: number;
  pagesTotal = 1;

  constructor(
    private apiService: ApiService,
    private searchService: SearchService,
    private submissionsService: SubmissionsService,
    private exportPdfService: ExportPdfService
  ) {}

  ngOnInit(): void {
    this.getData();

    this.searchService.search$.subscribe((search: string) => {
      this.search = search;
      this.submissionsToShow = this.submissionsList.filter(
        (task: SubmissionTask) =>
          task.task.toLowerCase().includes(search.toLowerCase())
      );
    });

    this.exportPdfService.exportPdf$.subscribe((exportPdf: boolean) => {
      if (exportPdf) {
        this.exportPDF();
        this.exportPdfService.exportPdf$.next(false);
      }
    });
  }

  getData() {
    this.submissionTasksSubs = this.apiService
      .getSubmissionTasks()
      .subscribe((tasks: SubmissionTask[]) => {
        this.submissionsList = tasks;
        // Send data to service
        this.submissionsService.changeData(this.submissionsList);

        this.submissionsToShow = tasks;
        this.submissionsLen = this.submissionsList.length;
        this.pagesTotal = Math.ceil(this.submissionsLen / this.entriesToShow);

        this.isLoaded = true;
      });
  }

  onCheckAll() {
    this.allChecked = !this.allChecked;
    if (this.allChecked) {
      this.submissionsList.forEach((task) => (task.checked = true));
    } else {
      this.submissionsList.forEach((task) => (task.checked = false));
    }
  }

  onCheckboxChange(task: SubmissionTask) {
    if (task) {
      task.checked = !task.checked;
    }
  }

  // Pagination
  getVariablesFromPaginator(activePage: number) {
    this.activePage = activePage;
  }

  exportPDF(): void {
    //content

    const DATA = document.getElementById('content') as HTMLCanvasElement;
    html2canvas(DATA, {
      ignoreElements: function (node) {
        return node.nodeName === 'IFRAME';
      },
    }).then((canvas) => {
      const fileWidth = 208;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('table.pdf');
    });
  }

  ngOnDestroy(): void {
    this.submissionTasksSubs.unsubscribe();
  }
}
