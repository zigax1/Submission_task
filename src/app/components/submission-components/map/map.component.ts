import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SubmissionsService } from 'src/app/services/submissions.service';
import { SubmissionTask } from 'src/app/models/SubmissionTask';

export interface Marker {
  position: {
    lat: number;
    lng: number;
  };
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  submissionsList: SubmissionTask[] = [];

  center: google.maps.LatLngLiteral = {
    lat: 46.39927,
    lng: 15.67449,
  };

  marker: Marker = {
    position: {
      lat: 46.39927,
      lng: 15.67449,
    },
  };

  apiLoaded: Observable<boolean>;

  constructor(
    httpClient: HttpClient,
    private submissionsService: SubmissionsService
  ) {
    this.apiLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyAXCZqA9MLUxmXMUejiTsMWuRuf--XkGcM',
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  ngOnInit(): void {
    this.submissionsList = this.submissionsService.getData();
  }
}
