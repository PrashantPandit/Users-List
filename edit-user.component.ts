import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userData: any;
  editFormGroup: FormGroup;
  genders = [
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' }
  ]

  constructor(public dialogRef: MatDialogRef<EditUserComponent>, @Inject(MAT_DIALOG_DATA) public data, public formBuilder: FormBuilder, private usersService: UsersService) {
    this.userData = this.data.userData;
    this.createEditUserForm();
  }

  ngOnInit(): void {
  }

  createEditUserForm() {
    this.editFormGroup = this.formBuilder.group({
      name: [],
      email: [],
      gender: [],
      address: [],
      dob: [],
      uId: []
    })
    this.userData.dob = this.usersService.dateFormater(this.userData.dob);
    this.editFormGroup.patchValue(this.userData);
  }

  editUser() {
    console.log(this.editFormGroup.value);
    this.dialogRef.close({ event: 'Submit', data: this.editFormGroup.value });
  }

  close() {
    this.dialogRef.close();
  }
}
