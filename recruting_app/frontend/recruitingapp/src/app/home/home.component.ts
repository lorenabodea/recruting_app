import { RetrieveDataServiceService, Certificate, Recruit } from './retrieve-data-service.service';
import { RecrutDetailsComponent } from './components/recrut-details/recrut-details.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public recruits: Recruit[] = new Array<Recruit>();

  constructor(private readonly auth: AuthService, public dialog: MatDialog, public dataService: RetrieveDataServiceService) { }

  public openDialog(recruit: Recruit): void {
    const dialogRef = this.dialog.open(RecrutDetailsComponent, {
      data: recruit
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.dataService.getRecruits().toPromise().then((recruits) => {
      for (const recruit of recruits) {
        const newRecruit: Recruit = {
          firstName: recruit['first_name'],
          lastName: recruit['last_name'],
          email: recruit['email'],
          birthday: recruit['birthday'],
          phone: recruit['phone'],
          photo: recruit['photo'],
          favourite: recruit['favourite']
        };

        const promiseCertificates = this.dataService.getCertificates(recruit['id']).toPromise().then((certificates) => {
          newRecruit.certificates = certificates;
        });

        const promisejobs = this.dataService.getJobs(recruit['id']).toPromise().then((jobs) => {
          newRecruit.jobs = jobs;
        });

        const promiseLanguages = this.dataService.getLanguages(recruit['id']).toPromise().then((languages) => {
          newRecruit.languages = languages;
        });

        const promiseInstitutions = this.dataService.getSchoolInstitutions(recruit['id']).toPromise().then((schoolInstitutions) => {
          newRecruit.schoolInstitutions = schoolInstitutions;
        });

        Promise.all([promiseCertificates, promisejobs, promiseLanguages, promiseInstitutions]).then(()=> {
          this.recruits.push(newRecruit);
        });
      }
    });
  }

}
