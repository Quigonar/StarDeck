import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeI } from 'app/models/employee.interface';
import { ApiService } from 'app/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {
  public employee: EmployeeI
  private routeSub: Subscription
  private employeeID : any

  public employeeForm = new FormGroup({
    FirstN : new FormControl(),
    FirstLN : new FormControl(),
    SecondLN : new FormControl(),
    ID : new FormControl(),
    Username : new FormControl(),
    Password : new FormControl(),
    Province : new FormControl(),
    Canton : new FormControl(),
    District : new FormControl(),
    PhoneNum : new FormControl(),
    /*ProfilePic : new FormControl()*/
  })

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    this.api.getBase64(event.item(0)).then((imagen: any) => {
      this.employee.ProfilePic = imagen.base
    })
  }

  constructor(private route:ActivatedRoute, private api:ApiService, private router:Router) { }

  onEdit(form){
    this.employee.FirstN = form.FirstN
    this.employee.FirstLN = form.FirstLN
    this.employee.SecondLN = form.SecondLN
    this.employee.Username = form.Username
    this.employee.Password = form.Password
    this.employee.Province = form.Province
    this.employee.Canton = form.Canton
    this.employee.District = form.District
    this.employee.PhoneNum = form.PhoneNum

    console.log(this.employee)
    // HACER UPDATE POR EL API
    
  }

  ngOnInit(): void {
    this.employeeForm.controls['ID'].disable()

    this.routeSub = this.route.params.subscribe(params => {
      this.employeeID = params['id']
    })

    //PEDIR AL API EL EMPLOYEE CON EL PARAMETRO DEL ID Y REEMPLAZAR EL VALOR DE this.employee

  }

}
