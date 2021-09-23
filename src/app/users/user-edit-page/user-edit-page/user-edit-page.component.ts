import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Role, User, UserForUpdateDto } from 'src/app/shared/interfaces';
import { RolesService } from 'src/app/shared/services/roles.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { switchMap } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.scss']
})
export class UserEditPageComponent implements OnInit {

  submitted = false
  form: FormGroup
  user: User
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(private usersService: UsersService,
              private router: Router,
              private rolesService: RolesService,
              private route: ActivatedRoute,
              private alert: AlertService
              ) { }

  ngOnInit(): void {
      this.route.params.pipe(switchMap((params: Params) => {
        console.log("id=",params['id'])
        return this.usersService.getUserById(params['id'])
      })).
      subscribe((user: User) => {
        console.log(user)
        this.user = user
        this.form = new FormGroup({
          username: new FormControl(user.userName, Validators.required),
          email: new FormControl(user.email, [Validators.required,
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
        this.loadUserRoles();
        }
      )
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
    const user: UserForUpdateDto = {
      userName: this.form.get('username').value,
      email: this.form.get('email').value
    }

    console.log(user)
    this.usersService.updateUser(this.user.id, user).subscribe(
       () => { this.submitted = false
        this.form.reset()
        this.router.navigate(['admin', 'users'])
        this.alert.success("User has been updated")
      },
       (error) => {
         console.log('Error when updating ', error)
        this.submitted = false
      }
    )


  }

  loadRoles(){
    this.rolesService.getRoles().subscribe((roles: Role[]) => {
      this.dropdownList = roles
    })
  }

  loadUserRoles(){
    this.usersService.getUserRoles(this.user.id).subscribe((roles: Role[]) => {
      this.selectedItems = roles
    })
  }
}


