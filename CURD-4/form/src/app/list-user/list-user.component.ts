import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_helpers/user.service';
import { User } from '../_helpers/user.interface';
import Swal from 'sweetalert2';
// import { RouterModule } from 'express';
import { Navigation, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit{
  users: User[] = [];

  constructor(private _toastr: ToastrService,  private _userService: UserService, private router : Router) {
    

  }
  ngOnInit(): void {
    this.getAllUsers();
    
  }
  
  getAllUsers() {
    this._userService.getUsers().subscribe((res: User[]) => {
      this.users = res;
    });

  }
  Edit(userId: number) {
this.router.navigate(['/add-user'],{queryParams : {userId:userId}})
   
  }
  Delete(userId: number) {
    // this._userService.deleteUser(userId).subscribe(res =>{
    //   this.getAllUsers();
    //   this._toastr.success("Deleted Success", " User Registration");
    // });



    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.deleteUser(userId).subscribe(res => {
          this._toastr.success("Deleted Success", "User registation !!!");
          this.getAllUsers();
        });
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });

  }
}


