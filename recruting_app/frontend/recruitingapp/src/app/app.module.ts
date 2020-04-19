import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { UserCardComponent } from './home/components/user-card/user-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RecrutDetailsComponent } from './home/components/recrut-details/recrut-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { UserInterfaceComponent } from './user-interface/user-interface.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { FavouriteButtonComponent } from './home/components/recrut-details/favourite-button/favourite-button.component';
import { LoginComponent } from './core/login/login/login.component';

const firebaseConfig = {
  apiKey: 'AIzaSyCWR_39P8u2NgrZyeJAVqBrqeu04Hy_v1s',
  authDomain: 'recrutingapp-7b57d.firebaseapp.com',
  databaseURL: 'https://recrutingapp-7b57d.firebaseio.com',
  projectId: 'recrutingapp-7b57d',
  storageBucket: 'recrutingapp-7b57d.appspot.com',
  messagingSenderId: '1075183552758',
  appId: '1:1075183552758:web:be159437d9af6f7999c4d7',
  measurementId: 'G-2HRF3L4554'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserCardComponent,
    RecrutDetailsComponent,
    UserInterfaceComponent,
    FavouriteButtonComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    HttpClientModule,
    FlexLayoutModule,
    MatCardModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule.forRoot([
        { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'user', component: UserInterfaceComponent },
      { path: 'login', component: LoginComponent }
    ]),
   ],

  providers: [MatNativeDateModule],
  bootstrap: [AppComponent],
  entryComponents: [RecrutDetailsComponent]
})
export class AppModule { }
