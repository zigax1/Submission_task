import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Page } from 'src/app/models/Page';
/**
 * @member {number} displayIndex - used as page label on paginator display
 * @member {boolean} displayValue - used in template for setting the display of this page's *displayIndex*: if it's *true* the *displayIndex* will be displayed as a page label, if it's *false* the *...* (three dots) will be displayed, and if it's *null* it won't be displayed.
 */

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit {
  @Input() prevText = 'Prev';
  @Input() nextText = 'Next';
  @Input() entriesToShow = 1;
  @Input() pagesToShowAroundActive!: number;
  @Input() dataLength = 0;
  @Input() pagesTotal!: number;
  @Output() sendChangesToParent = new EventEmitter<number>();

  activePage = 1;

  pagesAsObjects: Page[] = [];

  ngOnInit() {
    for (let i = 1; i <= this.pagesTotal; i++) {
      this.pagesAsObjects.push({ displayIndex: i, displayValue: null });
    }

    // render pages:
    this.displayCondition(
      this.pagesToShowAroundActive,
      this.pagesTotal,
      this.activePage,
      this.pagesAsObjects
    );
  }

  /**
   * Called when user clicks on a page in paginator to switch to it.
   *
   * @param index - The new *activePage* value i.e. the new page to display as selected.
   * @remarks *displayCondition()* is called to render the new display of pages based on its rules for the new *activePage* value.
   */

  changePage(index: number) {
    if (index > 0 && index <= this.pagesTotal) this.activePage = index;

    this.displayCondition(
      this.pagesToShowAroundActive,
      this.pagesTotal,
      this.activePage,
      this.pagesAsObjects
    );
  }

  /**
   * Renders the display of pages, based on selected *activePage*, *totalPages* number and *pagesToShowAroundActive* value.
   *
   * @param p2show - *pagesToShowAroundActive* value
   * @param total - *totalPages* value
   * @param active - *activePage* value
   * @param pages - *pagesAsObjects* array
   * @remarks Emitter *sendChangesToParent* is used to send new value of *activePage* to parent, so that parent can re-render the display of data.
   */

  displayCondition(
    p2show: number,
    total: number,
    active: number,
    pages: Page[]
  ) {
    pages.forEach((p: Page, idx: number) => {
      pages[idx].displayValue = null;
      if (
        idx == 0 ||
        idx == total - 1 ||
        idx + 1 == active ||
        (idx < active + p2show && idx + 1 >= active - p2show) ||
        (idx == total - 2 && total - active == p2show + 2) ||
        (idx == 1 && active - p2show == 3)
      ) {
        pages[idx].displayValue = true;
      } else if (idx == active + p2show || idx == active - (p2show + 2)) {
        pages[idx].displayValue = false;
      }
    });
    this.sendChangesToParent.emit(this.activePage);
  }

  /**
   * Checks for the right range of values passed from the parent via @Input.
   *
   * @returns {boolean} True or false: true if warning error should be displayed to the user.
   */
}
