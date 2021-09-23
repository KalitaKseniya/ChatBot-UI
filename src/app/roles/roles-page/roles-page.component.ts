import { AlertService } from './../../shared/services/alert.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/shared/interfaces';
import { RolesService } from 'src/app/shared/services/roles.service';

@Component({
  selector: 'app-roles-page',
  templateUrl: './roles-page.component.html',
  styleUrls: ['./roles-page.component.scss']
})
export class RolesPageComponent implements OnInit, OnDestroy {

  roles: Role[] = []
  gSub: Subscription
  dSub: Subscription

  constructor(private rolesService: RolesService,
              private alert: AlertService) { }

  ngOnInit(): void {
    this.gSub = this.rolesService.getRoles().subscribe((roles: Role[]) => {
      this.roles = roles
    },
    (error) => console.log('Error when fetching roles', error))
  }

  deleteRole(id: string){
    this.dSub = this.rolesService.deleteRole(id).subscribe(() => {
      this.roles = this.roles.filter(r => r.id !== id)
      this.alert.danger('Role has been deleted')
    },
    (error) => console.log('Error deleting role', error))
  }

  ngOnDestroy(){
    if(this.dSub){
      this.dSub.unsubscribe()
    }
     if(this.gSub){
      this.gSub.unsubscribe()
    }
  }

}
