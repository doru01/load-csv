import { Component, ViewChild, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { MatPaginator } from '@angular/material';
import { CsvDataSource } from './csv.data.source';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'import-csv',
  templateUrl: './import-csv.component.html',
  styleUrls: ['./import-csv.component.scss']
})
export class ImportCsvComponent implements OnInit{



  ngOnInit(): void {
    this.dataSource = new CsvDataSource(this._dataSubject);
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  itemsFromCsv = [];
  selectedItem = "";
  //should be defined for each import
  
  columns : object [] = [];
  displayedColumns : string [] = [];;
 
  dataSource: CsvDataSource;
  _dataSubject = new BehaviorSubject<any[]>([]);
  tableData : string [] = [];

  
  /**
   *
   */
  constructor(private papa: Papa) {


  }


  updateColumns(){
    console.log ("item", this.selectedItem);
  }

  handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var file = files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
      var csv = event.target.result; // Content of CSV file
  
      this.columns = [];
      this.displayedColumns=['select'];
  
      this.papa.parse(csv, {
        skipEmptyLines: true,
        header: true,
        complete: (results) => {


          
          let colHeader = Object.getOwnPropertyNames(results.data[0]);

          console.log("colHeader", colHeader);

          colHeader.forEach(item => {


            this.displayedColumns.push(item);  

            this.columns.push(
              { 
                columnDef: item, 
                header: item, 
                cell: (element: any) => `${element[item]}` }
            );
          });

          this.dataSource.data = results.data;
          this.dataSource.paginator = this.paginator;
          // console.log(this.test);
          console.log('Parsed: k', results.data);
        }
      });
    }
  }


  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}