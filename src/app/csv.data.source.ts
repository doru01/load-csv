import { DataSource } from '@angular/cdk/table';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';


export class CsvDataSource extends MatTableDataSource<any> {

    /**
     *
     */
    constructor(private items: BehaviorSubject<any[]>) {
        super();
    }

  }