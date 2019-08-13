import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImportCsvComponent } from './import-csv.component';
import { PapaParseModule } from 'ngx-papaparse';

import {
  MatNativeDateModule,

} from '@angular/material';
import { MyMaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  exports: [

  ],
  declarations: [
    AppComponent,
    ImportCsvComponent
  ],
  imports: [


    BrowserModule,
    AppRoutingModule,
    PapaParseModule,
    MyMaterialModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    FormsModule
        

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
