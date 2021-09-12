import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit, OnDestroy {

  users: User[] = []
  gSub: Subscription
  dSub: Subscription

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.gSub = this.usersService.getUsers().subscribe((users: User[]) => {
      this.users = users
    },
    (error) => console.log('Error when fetching users', error))
  }

  deleteUser(id: string){
    this.dSub = this.usersService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== id)
    },
    (error) => console.log('Error deleting user', error))
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
