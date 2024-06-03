import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl, FormArray} from "@angular/forms";
import {MatRadioModule} from '@angular/material/radio';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  EmployeeForm: FormGroup | any;;
  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private router: Router
  ) { }
  storeList:any=[];

  ngOnInit() {
    this.EmployeeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      role: ['', [Validators.required]],
      phoneArray: this.formBuilder.array([this.itemsformGroup()]),
      gender: ['null', [Validators.required]],
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.EmployeeForm.controls[controlName].hasError(errorName);
  }
  public hasPhoneError(index: number, errorName: string) {
    return (this.EmployeeForm?.get('phoneArray') as FormArray)?.at(index)?.get('phone')?.hasError(errorName);
  }


  private itemsformGroup(): FormGroup {
    return this.formBuilder.group({
      phone: [null, Validators.required],
    });
  }
  addTable(i: number) {
    const addValue = this.EmployeeForm.get('phoneArray') as FormArray;
    addValue.push(this.itemsformGroup());
  }
  deleteRow(i: number) {
    var delBtn = confirm('Do you really wants to delete?');
    const addValue = this.EmployeeForm.get('phoneArray') as FormArray;
    if (delBtn == true) {
      if (addValue.length > 1) {
        addValue.removeAt(i);
      } else {
        addValue.reset();
      }
    }
  }
  save() {
    if (this.EmployeeForm.invalid) {
      this.markFormGroupTouched(this.EmployeeForm);
      return;
    }
    const savedData = localStorage.getItem('employeeData');
    let dataArray: any[] = [];

    if (savedData) {
      dataArray = JSON.parse(savedData);
    }

    dataArray.push(this.EmployeeForm.value);
    localStorage.setItem('employeeData', JSON.stringify(dataArray));
    this.EmployeeForm.reset();
    this.router.navigate(['/employee-list']);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
