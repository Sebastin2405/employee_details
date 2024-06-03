import {Routes,RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {MatRadioModule} from '@angular/material/radio';

const appRoutes:Routes=[
    { path: 'employee-form', component: EmployeeDetailsComponent },
    { path: 'employee-list', component: EmployeeListComponent },
    { path: '**', redirectTo: 'employee-form' }
]

@NgModule({
    imports:[
          RouterModule.forRoot(appRoutes)
    ],
    
    exports:[RouterModule]
})

export class AppRoutingModule {}
