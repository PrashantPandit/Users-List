import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UsersService } from '../users.service';
export interface TableData { }

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns = [
    "srno",
    "name",
    "email",
    "gender",
    "address",
    "dob",
    "operations"
  ];

  dataSource: any;
  selection = new SelectionModel<TableData>(true, []);
  listPageIndex = 0;
  listPageSize = 5;

  dummyUserList = [
    {
      name: 'Prashant Sutar',
      email: 'prashant.sutar@gmail.com',
      gender: 'Male',
      address: 'Pune',
      dob: 'Sat Sep 26 1992 00:00:00 GMT+0530 (India Standard Time)',
      uId: '001'
    },
    {
      name: 'Kiran Kumbhar',
      email: 'kiran.kumbhar@gmail.com',
      gender: 'Male',
      address: 'Pune',
      dob: 'Sat Sep 26 1992 00:00:00 GMT+0530 (India Standard Time)',
      uId: '001'
    },
    {
      name: 'Rushikesh Acharya',
      email: 'rushikesh.acharya@gmail.com',
      gender: 'Male',
      address: 'Pune',
      dob: 'Sat Sep 26 1992 00:00:00 GMT+0530 (India Standard Time)',
      uId: '001'
    },
    {
      name: 'Hitesh Solankhi',
      email: 'hitesh.solankhi@gmail.com',
      gender: 'Male',
      address: 'Pune',
      dob: 'Sat Sep 26 1992 00:00:00 GMT+0530 (India Standard Time)',
      uId: '001'
    },
    {
      name: 'Jai Kulkarni',
      email: 'jai.kulkarni@gmail.com',
      gender: 'Male',
      address: 'Pune',
      dob: 'Sat Sep 26 1992 00:00:00 GMT+0530 (India Standard Time)',
      uId: '001'
    }
  ]

  userToDelete: any;

  constructor(private dialog: MatDialog, private usersService: UsersService) { }

  ngOnChanges() {

  }

  ngOnInit(): void {
    let tableDataObject: TableData[] = this.dummyUserList;
    this.dataSource = new MatTableDataSource<TableData>(tableDataObject);
  }

  // Whether the number of selected elements matches the total number of rows.
  isAllSelected() {
    return this.dataSource.data.every(row => this.selection.isSelected(row.uId));
  }

  // Selects all rows if they are not all selected; otherwise clear selection
  masterToggle() {
    if (this.isAllSelected()) {
      this.dataSource.data.forEach(row => this.selection.deselect(row.uId));
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row.uId));
    }
  }

  updateTableData(data) {
    data.forEach(d => {
      let index = this.dummyUserList.findIndex(i => i.uId === d.uId);
      this.dummyUserList.splice(index, 1);
      this.dummyUserList.splice(index, 0, d);
      let tableDataObject: TableData[] = this.dummyUserList;
      this.dataSource = new MatTableDataSource<TableData>(tableDataObject);
    })
  }

  pageChanged(event) { }

  confirmDelete(reference, user) {
    this.userToDelete = user;
    this.dialog.open(reference, {
      width: '40%', height: 'auto', disableClose: true
    })
  }

  deleteUser(uId) {
    let index = this.dummyUserList.findIndex(d => d.uId === uId);
    this.dummyUserList.splice(index, 1);
    let tableDataObject: TableData[] = this.dummyUserList;
    this.dataSource = new MatTableDataSource<TableData>(tableDataObject);
    this.close();
  }

  close() {
    this.dialog.closeAll();
  }

  editUser(user) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '40%',
      height: 'auto',
      data: {
        userData: user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== null) {
        if (result.event === 'Submit') {
          // result.data.dob = this.usersService.dateFormater(result.data.dob);
          let index = this.dummyUserList.findIndex(i => i.uId === result.data.uId);
          this.dummyUserList.splice(index, 1);
          this.dummyUserList.splice(index, 0, result.data);
          let tableDataObject: TableData[] = this.dummyUserList;
          this.dataSource = new MatTableDataSource<TableData>(tableDataObject);
        }
      }
    });
  }
}
