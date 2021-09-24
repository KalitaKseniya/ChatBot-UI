import { AlertService } from './../../shared/services/alert.service';
import { Chat, ChatForManipulationDto } from './../../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChatsService } from 'src/app/shared/services/chats.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-chat-edit-page',
  templateUrl: './chat-edit-page.component.html',
  styleUrls: ['./chat-edit-page.component.scss']
})
export class ChatEditPageComponent implements OnInit {

  
  form: FormGroup
  chat: Chat
  uSub: Subscription
  submitted = false

  constructor(private chatsService: ChatsService,
              private router: Router,
              private route: ActivatedRoute,
              private alert: AlertService) { }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.chatsService.getChatById(params['id'])
    })).
    subscribe((chat: Chat) => {
      this.chat = chat
      this.form = new FormGroup({
        userRequest: new FormControl(chat.userRequest, Validators.required),
        botResponse: new FormControl(chat.botResponse),
        nextIds: new FormControl(chat.nextIds),
    })
  })
}

  submit(){
    if(this.form.invalid){
      return
    }
    this.submitted = true
    const chat: ChatForManipulationDto ={
      userRequest: this.form.get('userRequest').value,
      botResponse: this.form.get('botResponse').value,
      nextIds: this.form.get('nextIds').value,
    }
    
    this.uSub = this.chatsService.updateChat(this.chat.id, chat)
      .subscribe(() => {
        this.router.navigate(['/admin', 'chats'])
        this.alert.success('Chat has been updated')
        this.submitted = false}, 
        () => { this.submitted = false}
    )
  }

  ngOnDestroy(){
    if(this.uSub){
      this.uSub.unsubscribe()
    }
  }

}
