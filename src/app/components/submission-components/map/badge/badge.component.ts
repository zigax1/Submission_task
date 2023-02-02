import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent implements OnInit {
  @Input() status = '';
  customStatus = '';

  ngOnInit(): void {
    if (this.status === 'lowRisk') {
      this.customStatus = 'Low Risk';
    } else if (this.status === 'uncomplete') {
      this.customStatus = 'Uncomplete';
    } else {
      this.customStatus = 'Needs Review';
    }
  }
}
