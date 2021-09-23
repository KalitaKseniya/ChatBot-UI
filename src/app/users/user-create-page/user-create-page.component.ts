import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Role, User, UserForCreationDto } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user-create-page',
  templateUrl: './user-create-page.component.html',
  styleUrls: ['./user-create-page.component.scss']
})
export class UserCreatePageComponent implements OnInit {

  submitted = false
  form: FormGroup
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(private usersService: UsersService,
              private router: Router,
              private rolesService: RolesService,
              private alert: AlertService
              ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required,
                                      Validators.email]),
      })
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
      this.loadRoles();
  }

  submit(){
    if(this.form.invalid){
      return
    }
    this.submitted = true
    let selectedRoles = []
    if(this.selectedItems.length != 0){
      for(let i = 0; i < this.selectedItems.length; i++){
        selectedRoles.push(this.selectedItems[i].name)
      }
    }
    const user: UserForCreationDto = {
      userName: this.form.get('username').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      roles: selectedRoles
    }

    console.log(user)
    this.usersService.createUser(user).subscribe(
       () => { this.submitted = false
        this.form.reset()
        this.router.navigate(['admin', 'users'])
        this.alert.success("User has been created")
      },
       (error) => {
         console.log('Error when creating ', error)
        this.submitted = false
      }
    )


  }

  loadRoles(){
    this.rolesService.getRoles().subscribe((roles: Role[]) => {
      this.dropdownList = roles
    })
  }
}
