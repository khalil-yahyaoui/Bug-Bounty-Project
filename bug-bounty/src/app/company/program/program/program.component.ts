import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgramService } from './program.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})

export class ProgramComponent implements OnInit {
  animal: string;
  name: string;
  model: any = {};
  inScopes: any = [];
  outOfScopes: any = [];
  constructor(
    private programService: ProgramService,
    public dialog: MatDialog,
    public router: Router
  ) { }

  activities = [
    {
      prog_name: "prog1",
      create_date:"27/01/2021",
      description:"random",
      status:"Resolved",
      payment: "150$"
    }
  ]
  programs = [];
  ngOnInit(): void {
    let token = localStorage.getItem('token');
    this.programService.fetchPrograms().subscribe(
      (response: any) => {
        this.programs = response;
      },
      (error: any) => {
        this.programs = [
          'A','B','C'
        ]
      }
    )
    this.addInScopeField();
    this.addOutOfScopeField();
  }
  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DialogDelete, {
      width: '500px',
      height: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  openEditDialog(): void {
    const dialogRef = this.dialog.open(DialogEdit, {
      width: '900px',
      height: '500px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  viewProgram(): void{
    let id = '1';
    const link = ['program/'+id];
    this.router.navigate(link);
  }


  addProgram(form: NgForm){
    this.programService.addProgram(form.value).subscribe(
      (response: any) => {
        const link = ['program/'+response.id];
        this.router.navigate(link);
      },
      (error: any) => {
        alert("bad");
      }
    )
  }
  addInScopeField(){
    let scope = {
      name: '',
      id: new Date().getTime()
    }
    this.inScopes.push(scope);
  }
  deleteInScope(scope) {
    for (var i = 0; i < this.inScopes.length; i++) {
      if (scope.id == this.inScopes[i].id) {
        this.inScopes.splice(i, 1);
      }
    }
  }
  addOutOfScopeField(){
    let scope = {
      name: '',
      id: new Date().getTime()
    }
    this.outOfScopes.push(scope);
  }
  deleteOutOfScope(scope) {
    for (var i = 0; i < this.outOfScopes.length; i++) {
      if (scope.id == this.outOfScopes[i].id) {
        this.outOfScopes.splice(i, 1);
      }
    }
  }
}
@Component({
  selector:'dialog-delete',
  templateUrl: './dialog/dialog-delete.html',
  styleUrls: ['./dialog/dialog-delete.css']
})
export class DialogDelete{
  constructor(
    private programService: ProgramService,
    public dialogRef: MatDialogRef<DialogDelete>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(formulaire: NgForm){
    let token = localStorage.getItem('token');
    this.programService.checkPassword(token, formulaire.value.password).subscribe(
      (response: any) => {
        console.log('can delete');
        },
      (error: any) => {
        console.log('error found');
      }
    );
  }
}
@Component({
  selector:'dialog-edit',
  templateUrl: './dialog/dialog-edit.html',
})
export class DialogEdit{
  model: any = {};
  inScopes: any = [];
  outOfScopes: any = [];
  constructor(
    private programService: ProgramService,
    public dialogRef: MatDialogRef<DialogEdit>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  ngOnInit(){
    this.addInScopeField();
    this.addOutOfScopeField();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  updateProgram(formulaire: NgForm){
    //todo
  }
  addInScopeField(){
    let scope = {
      name: '',
      id: new Date().getTime()
    }
    this.inScopes.push(scope);
  }
  deleteInScope(scope) {
    for (var i = 0; i < this.inScopes.length; i++) {
      if (scope.id == this.inScopes[i].id) {
        this.inScopes.splice(i, 1);
      }
    }
  }
  addOutOfScopeField(){
    let scope = {
      name: '',
      id: new Date().getTime()
    }
    this.outOfScopes.push(scope);
  }
  deleteOutOfScope(scope) {
    for (var i = 0; i < this.outOfScopes.length; i++) {
      if (scope.id == this.outOfScopes[i].id) {
        this.outOfScopes.splice(i, 1);
      }
    }
  }
}
