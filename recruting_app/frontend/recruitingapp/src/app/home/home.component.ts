import { AuthenticationService } from './../core/auth/authentication.service';
import { Observable, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { RetrieveDataServiceService, Certificate, Recruit } from './retrieve-data-service.service';
import { RecrutDetailsComponent } from './components/recrut-details/recrut-details.component'; 2
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  favourite = 1;
  user = JSON.parse(localStorage.getItem('currentUser'));

  recruitsWithFields$ = combineLatest([
    this.dataService.recruits$,
    this.dataService.jobs$,
    this.dataService.certificates$,
    this.dataService.languages$,
    this.dataService.schools$,
    this.dataService.feedbacks$
  ])
    .pipe(
      map(([recruits, jobsResponse, certificatesResponse,
        languagesResponse, schoolsResponse, feedbacksResponse]) => {
        recruits.forEach(recruit => {
          recruit.certificates = certificatesResponse.filter(certificate => certificate.userId === recruit.id);
          recruit.jobs = jobsResponse.filter(job => job.userId === recruit.id);
          recruit.languages = languagesResponse.filter(language => language.userId === recruit.id);
          recruit.schoolInstitutions = schoolsResponse.filter(school => school.userId === recruit.id);
          recruit.feedback = feedbacksResponse.filter(feedback => feedback.userId === recruit.id);
        });
        return recruits;
      }),
      map((recruits) => {
        const currentYear = moment();
        recruits.forEach(recruit => {
          if (recruit.jobs && recruit.jobs.length > 0) {
            const exp = moment(recruit.jobs[0].fromYear, 'YYYY');
            recruit.experience = currentYear.diff(exp, 'years', false) ? currentYear.diff(exp, 'years', false) : 0;
          } else {
            recruit.experience = 0;
          }
          //sort schools years
          if(recruit.schoolInstitutions && recruit.schoolInstitutions.length > 1) {
            recruit.schoolInstitutions.sort(this.compareNumberValues('fromYear', 'desc'));
          }
          //sort jobs year
          if(recruit.jobs && recruit.jobs.length > 1) {
            recruit.jobs.sort(this.compareNumberValues('fromYear', 'desc'));
          }
        });
        console.log(recruits);
        return recruits;
      }),
      shareReplay(1)
    );

  private selectedFavouriteSubject = new BehaviorSubject<number>(0);
  selectedFavouriteAction$ = this.selectedFavouriteSubject.asObservable();

  private selectedOrderingSubject = new BehaviorSubject<number>(0);
  selectedOrderingAction$ = this.selectedOrderingSubject.asObservable();

  private selectedSalarySubject = new BehaviorSubject<number>(0);
  selectedSalaryAction$ = this.selectedSalarySubject.asObservable();

  private selectedExperienceSubject = new BehaviorSubject<number>(0);
  selectedExperienceAction$ = this.selectedExperienceSubject.asObservable();

  recruitsFilteredByFavourite$ = combineLatest([
    this.recruitsWithFields$,
    this.selectedFavouriteAction$,
    this.selectedSalaryAction$,
    this.selectedExperienceAction$,
    this.selectedOrderingAction$,
  ]).pipe(
    map(([recruits1, favouriteSelection, salarySelection, experienceSection, ordering]) => {
      if (ordering === 1) {
        recruits1.sort(this.compareValues('salary', 'desc'));
      } else {
        recruits1.sort(this.compareValues('lastName', 'asc'));
      }
      return recruits1
        .filter(recruit => favouriteSelection ? recruit.favourite === favouriteSelection : true)
        .filter(recruit =>
          (salarySelection === 1 ? recruit.salary < 3000 :
            salarySelection === 2 ? recruit.salary >= 3000 && recruit.salary < 4000 :
              salarySelection === 3 ? recruit.salary >= 4000 && recruit.salary < 5000 :
                salarySelection === 4 ? recruit.salary > 5000 : true))
        .filter(recruit =>
          (experienceSection === 1 ? recruit.experience < 1 :
            experienceSection === 2 ? recruit.experience >= 1 && recruit.experience < 3 :
              experienceSection === 3 ? recruit.experience >= 3 && recruit.experience < 5 :
                experienceSection === 4 ? recruit.experience > 5 : true)
        );
    })
  );

  constructor(
    public dialog: MatDialog, public dataService: RetrieveDataServiceService,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router) { }

  public openDialog(recruit: Recruit): void {
    this.dialog.open(RecrutDetailsComponent, {
      data: recruit
    });
  }

  ngOnInit(): void {
  }

  filterByFavourite(favValue) {
    this.selectedFavouriteSubject.next(+favValue);
  }

  filterBySalary(salValue) {
    this.selectedSalarySubject.next(+salValue);
  }
  filterByExperience(expValue) {
    this.selectedExperienceSubject.next(+expValue);
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

  
  compareNumberValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = +a[key];
      const varB = +b[key];

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

  logOut() {
    this.authenticationService.logout();
  }

  goToForm() {
    this.router.navigate(['user']);
  }

}
