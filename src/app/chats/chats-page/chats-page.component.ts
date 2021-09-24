import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chat } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ChatsService } from 'src/app/shared/services/chats.service';

@Component({
  selector: 'app-chats-page',
  templateUrl: './chats-page.component.html',
  styleUrls: ['./chats-page.component.scss']
})
export class ChatsPageComponent implements OnInit, OnDestroy {

  chats: Chat[] = [];
  gSub: Subscription;
  dSub: Subscription;

  constructor(
    private chatsService: ChatsService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.gSub = this.chatsService.getChats().subscribe(
      (chats: Chat[]) => {
        this.chats = chats;
      },
      (error) => console.log('Error when fetching chats', error)
    );
  }

  deleteChat(id: number) {
    this.dSub = this.chatsService.deleteChat(id).subscribe(
      () => {
        this.chats = this.chats.filter((ch) => ch.id !== id);
        this.alert.danger('Chat has been deleted');
      },
      (error) => console.log('Error deleting chat', error)
    );
  }

  ngOnDestroy() {
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
    if (this.gSub) {
      this.gSub.unsubscribe();
    }
  }
}
