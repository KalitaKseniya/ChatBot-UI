import { AlertService } from './../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Permission,
  RoleForCreationDto,
} from 'src/app/shared/interfaces';
import { RolesService } from 'src/app/shared/services/roles.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PermissionsService } from 'src/app/shared/services/permissions.service';

@Component({
  selector: 'app-role-create-page',
  templateUrl: './role-create-page.component.html',
  styleUrls: ['./role-create-page.component.scss'],
})
export class RoleCreatePageComponent implements OnInit {
  submitted = false;
  form: FormGroup;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  permissions: Permission[] = [];

  constructor(
    private router: Router,
    private rolesService: RolesService,
    private alert: AlertService,
    private permsService: PermissionsService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.loadPermissions();
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    let selectedPermissions = [];
    if (this.selectedItems.length != 0) {
      selectedPermissions = this.permissions.filter((p) =>
        this.selectedItems.find((si) => si.id === p.id)
      );
    }
    const role: RoleForCreationDto = {
      name: this.form.get('name').value,
      permissions: selectedPermissions,
    };
    this.rolesService.createRole(role).subscribe(
      () => {
        this.submitted = false;
        this.form.reset();
        this.router.navigate(['admin', 'roles']);
        this.alert.success('Role has been created');
      },
      (error) => {
        console.log('Error when creating ', error);
        this.submitted = false;
      }
    );
  }

  loadPermissions() {
    this.permsService.getPermissions().subscribe((perms: Permission[]) => {
      this.permissions = perms;
      this.dropdownList = perms;
    });
  }
}
