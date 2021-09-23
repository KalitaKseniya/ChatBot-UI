import { PermissionsService } from './../../shared/services/permissions.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Permission, Role, RoleForCreationDto } from 'src/app/shared/interfaces';
import { RolesService } from 'src/app/shared/services/roles.service';
import { of } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-role-edit-page',
  templateUrl: './role-edit-page.component.html',
  styleUrls: ['./role-edit-page.component.scss']
})
export class RoleEditPageComponent implements OnInit {

  
  submitted = false
  role: Role = null
  rolePermissions: Permission[] = null
  permissions: Permission[] = null
  loading = true
  form: FormGroup = new FormGroup({})
  selectedItems: Permission[] = null

  constructor(private router: Router,
              private rolesService: RolesService,
              private route: ActivatedRoute,
              private permService: PermissionsService,
              private alert: AlertService
              ) { }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => {
      console.log("id=",params['id'])
      return this.rolesService.getRoleById(params['id'])
    })).
    subscribe((role: Role) => {
      this.role = role
      //console.log('role loaded',role)
      
      this.loadRolePermissions();
      this.loadPermissions();
      }
    )
  }

  submit(){
    
    this.submitted = true
    this.rolesService.updateRolePermissions(this.role.name, this.selectedItems).subscribe(()=>{
      
      this.submitted = false
      window.location.reload()
      this.alert.success('Permissions has been updated')
      //this.router.navigate(['admin', 'roles'])
    })
  }

  loadRolePermissions(){
    return this.rolesService.getRolePermissions(this.role.name)
                  .subscribe((rolePermissions: Permission[]) => {
                    this.rolePermissions = rolePermissions
                    this.selectedItems = rolePermissions
                    console.log('role p loaded', rolePermissions)
                  })
  }

  loadPermissions(){
    return this.permService.getPermissions()
                  .subscribe((permissions: Permission[]) => {
                    this.permissions = permissions
                    console.log('p loaded', permissions)
                    this.loading = false
                  })
  }

  contains(arr: Permission[], el: Permission){
    return arr.some(elem =>{
      return JSON.stringify(elem) == JSON.stringify(el)
    })
  }

  change(perm: Permission){
    if(this.contains(this.selectedItems, perm)){
      this.selectedItems = this.selectedItems.filter(p => p.id != perm.id)
    }
    else{
      this.selectedItems.push(perm)
    }
    console.log(this.selectedItems)
  }
}
