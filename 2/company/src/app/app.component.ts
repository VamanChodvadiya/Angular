import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
// import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { User } from './helper/user.interface';
import { Action } from './helper/action.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserApi } from './helper/user-api.service';
import { MustMatch } from './helper/must-match.oprators';
import Swal from 'sweetalert2';
import { Detail } from './helper/detail.interface';
import { EmpApi } from './helper/emp-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'company';
  addForm: FormGroup;
  addDetail: FormGroup;
  submitted: boolean = false;
  buttonText: string = "";
  FormTitle: string = "";
  dbops: Action;

  @ViewChild('content') elcotent: any;
  @ViewChild('detail') elcotent2: any;
  @ViewChild('detail1') elcotent3: any;
  modalRef: any;

  userData: User[] = [];
  empData: Detail[] = [];
  constructor(private _toastr: ToastrService, private modalService: NgbModal, private _userApi: UserApi, private _empApi: EmpApi) {

  }
  ngOnInit(): void {
    this.setFormState();
    this.getAllUsers();
    this.setFormDetail();
    this.getAllEmp();
  }
  setFormState() {

    this.buttonText = "save";
    this.FormTitle = "Add User";
    this.dbops = Action.create;


    this.addForm = new FormGroup({
      id: new FormControl(0),
      title: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
      lastname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
      dob: new FormControl('', Validators.compose([Validators.required, Validators.pattern((/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/))])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      confirmpassword: new FormControl('', Validators.required),
      acceptTerms: new FormControl('', Validators.requiredTrue)
    },
      MustMatch('password', 'confirmpassword'));


  }
  setFormDetail() {
    this.addDetail = new FormGroup({
      id: new FormControl(0),
      title: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
      lastname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
    });
  }
  get ctrl() {
    return this.addForm.controls;
  }
  get f(){
    return this.addDetail.controls;

  }
  addUser() {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    }


    switch (this.dbops) {
      case Action.create:
        //code here to save data in database
        this._userApi.addUser(this.addForm.value).subscribe(res => {
          this._toastr.success("User Added", "Usere Registration ");
          this.getAllUsers();
          this.cancelForm();

        })

        break;

      case Action.update:
        //code here to update data in database
        this._userApi.updateUser(this.addForm.value).subscribe(res => {
          this._toastr.success("User Updated", "Usere Registration ");
          this.getAllUsers();
          this.cancelForm();

        })
        break;


    }
  }
  addDetails(){
    this.submitted = true;

    if (this.addDetail.invalid) {
      return;
    }


    switch (this.dbops) {
      case Action.create:
        //code here to save data in database
        this._empApi.addUser(this.addDetail.value).subscribe(res => {
          this._toastr.success("User Added", "Usere Registration ");
          this.getAllEmp();
          this.cancelDetail();

        })

        break;

      case Action.update:
        //code here to update data in database
        this._empApi.updateUser(this.addDetail.value).subscribe(res => {
          this._toastr.success("User Updated", "Usere Registration ");
          this.getAllEmp();
          this.cancelDetail();

        })
        break;


    }
  }

  cancelForm() {
    this.buttonText = "save";
    this.FormTitle = "Add User";
    this.dbops = Action.create;
    this.addForm.reset({
      id: 0,
      title: '',
      firstname: '',
      lastname: '',
      dob: '',
      email: '',
      password: '',
      confirmpassword: '',
      acceptTerms: false

    });
    this.modalRef.close(this.elcotent);

  }
  cancelDetail() {
    this.buttonText = "save";
    this.FormTitle = "Add User";
    this.dbops = Action.create;
    this.addDetail.reset({
      id: 0,
      title: '',
      firstname: '',
      lastname: '',

    });
    this.modalRef.close(this.elcotent3);

  }
  openXl(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, { size: 'xl' });
  }
  opendetail(){
    this.modalRef = this.modalService.open(this.elcotent3, { centered: true });

  }
  delete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this record!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, Keep it!'
    }).then((result) => {
      if (result.isConfirmed) {
        //code here to delete record

        this._userApi.deleteUser(id).subscribe(res => {
          // this.userData = res;
          this.getAllUsers();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted. ',
            'success'
          )
        }
        );

      } else {
        Swal.fire(
          'Cancel!',
          'Your record is safe',
          'error'
        )
      }
    })
  }
  deletedetail(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this record!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, Keep it!'
    }).then((result) => {
      if (result.isConfirmed) {
        //code here to delete record

        this._empApi.deleteUser(id).subscribe(res => {
          // this.userData = res;
          this.getAllEmp();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted. ',
            'success'
          )
        }
        );

      } else {
        Swal.fire(
          'Cancel!',
          'Your record is safe',
          'error'
        )
      }
    })
  }
  edit(userId: number) {
    this.buttonText = "update";
    this.FormTitle = "Update User";
    this.dbops = Action.update;
    // this.modalRef = this.modalService.open(this.elcotent, { size: 'xl' });
    this.modalRef = this.modalService.open(this.elcotent2, { size: 'xl' });
    // this.modalRef = this.modalService.open(this.elcotent3, { size: 'xl' });

    let user = this.userData.find((u: User) => u.id === userId);

    this.addForm.patchValue(user);
    this.addForm.get('password').setValue('');
    this.addForm.get('confirmpassword').setValue('');
    this.addForm.get('acceptTerms').setValue(false);

  }
  editdetails(userId:number){
    this.buttonText = "update";
    this.FormTitle = "Update User";
    this.dbops = Action.update;
    // this.modalRef = this.modalService.open(this.elcotent, { size: 'xl' });
    this.modalRef = this.modalService.open(this.elcotent3, { centered: true });
    // this.modalRef = this.modalService.open(this.elcotent3, { size: 'xl' });

    let user = this.empData.find((u: Detail) => u.id === userId);

    this.addDetail.patchValue(user);
    // this.modalRef.close(this.elcotent3);
    // this.cancelDetail();
  }
  getAllUsers() {
    this._userApi.getUsers().subscribe((res: User[]) => {
      this.userData = res;
    });

  }
  getAllEmp() {
    this._empApi.getEmps().subscribe((res: Detail[]) => {
      this.empData = res;
    })
  }
  
}
