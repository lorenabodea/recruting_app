import { Observable, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { RetrieveDataServiceService, Certificate, Recruit } from './retrieve-data-service.service';
import { RecrutDetailsComponent } from './components/recrut-details/recrut-details.component'; 2
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  favourite = 1;

  recruitsWithFields$ = combineLatest([
    this.dataService.recruits$,
    this.dataService.jobs$,
    this.dataService.certificates$,
    this.dataService.languages$,
    this.dataService.schools$
  ])
    .pipe(
      map(([recruits, jobsResponse, certificatesResponse, languagesResponse, schoolsResponse]) => {
        recruits.forEach(recruit => {
          recruit.certificates = certificatesResponse.filter(certificate => certificate.userId === recruit.id);
          recruit.jobs = jobsResponse.filter(job => job.userId === recruit.id);
          recruit.languages = languagesResponse.filter(language => language.userId === recruit.id);
          recruit.schoolInstitutions = schoolsResponse.filter(school => school.userId === recruit.id);
        });
        return recruits;
      }),
      shareReplay(1)
    );

  private selectedFavouriteSubject = new BehaviorSubject<number>(0);
  selectedFavouriteAction$ = this.selectedFavouriteSubject.asObservable();

  private selectedOrderingSubject = new BehaviorSubject<number>(0);
  selectedOrderingAction$ = this.selectedOrderingSubject.asObservable();

  recruitsFilteredByFavourite$ = combineLatest([
    this.recruitsWithFields$,
    this.selectedFavouriteAction$,
    this.selectedOrderingAction$,
  ]).pipe(
    map(([recruits1, favouriteSelection, ordering]) => {
      if (ordering === 1) {
        recruits1.sort(this.compareValues('salary', 'desc'));
      } else {
        recruits1.sort(this.compareValues('lastName', 'asc'));

      }
      return recruits1.filter(recruit =>
        favouriteSelection ? recruit.favourite === favouriteSelection : true);
    })
  );

  recruitsFilteredByFavourite1$ = this.recruitsWithFields$.pipe(
    map(recruits =>
      recruits.filter(recruit =>
        this.favourite ? recruit.favourite === this.favourite : true))
  );

  constructor(public dialog: MatDialog, public dataService: RetrieveDataServiceService) { }

  public openDialog(recruit: Recruit): void {
    const dialogRef = this.dialog.open(RecrutDetailsComponent, {
      data: recruit
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }

  filterByFavourite(favValue) {
    this.selectedFavouriteSubject.next(+favValue);
  }

  order(value) {
    this.selectedOrderingSubject.next(+value);
  }

  compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

}
