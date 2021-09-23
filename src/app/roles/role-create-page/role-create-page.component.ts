import { AlertService } from './../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role, RoleForCreationDto } from 'src/app/shared/interfaces';
import { RolesService } from 'src/app/shared/services/roles.service';

@Component({
  selector: 'app-role-create-page',
  templateUrl: './role-create-page.component.html',
  styleUrls: ['./role-create-page.component.scss']
})
export class RoleCreatePageComponent implements OnInit {

  submitted = false
  form: FormGroup

  constructor(private router: Router,
              private rolesService: RolesService,
              private alert: AlertService
              ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
        name: new FormControl(null, Validators.required),
      })
  }

  submit(){
    if(this.form.invalid){
      return
    }
    this.submitted = true
    const role: RoleForCreationDto = {
      name: this.form.get('name').value
    }
    this.rolesService.createRole(role).subscribe(
       () => { this.submitted = false
        this.form.reset()
        this.router.navigate(['admin', 'roles'])
        this.alert.success('Role has been created')
      },
       (error) => {
         console.log('Error when creating ', error)
        this.submitted = false
      })
  }
}
