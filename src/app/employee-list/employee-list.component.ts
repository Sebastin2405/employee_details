import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'address', 'dob', 'role', 'phone', 'gender', 'action'];
  dataSource = new MatTableDataSource<any>;
  employeeList:any={};
  submittedData:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  ngOnInit(): void {
    this.getSubmittedData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getSubmittedData() {
    const data: any = localStorage.getItem('employeeData');
    if (data) {
      this.submittedData = JSON.parse(data);
      this.dataSource = new MatTableDataSource(this.submittedData)
    }else {
      this.dataSource = new MatTableDataSource();
    }
  }

  delete(row: any){
    console.log('row',row);
    const index = this.submittedData.indexOf(row);
    if (index > -1) {
      this.submittedData.splice(index, 1);
      this.dataSource = new MatTableDataSource(this.submittedData);
      localStorage.setItem('employeeData', JSON.stringify(this.submittedData));
    }
  }

}
