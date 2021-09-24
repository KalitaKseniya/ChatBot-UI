import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatForManipulationDto } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ChatsService } from 'src/app/shared/services/chats.service';

@Component({
  selector: 'app-chat-create-page',
  templateUrl: './chat-create-page.component.html',
  styleUrls: ['./chat-create-page.component.scss']
})
export class ChatCreatePageComponent implements OnInit {

  submitted = false 
  form: FormGroup

  constructor(private chatsService: ChatsService, 
              private router: Router, 
              private alert: AlertService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
        userRequest: new FormControl(null, Validators.required),
        botResponse: new FormControl(null),
        nextIds: new FormControl(null),
    })
  }

  submit(){
    if(this.form.invalid){
      return
    }
    this.submitted = true 
    const chat: ChatForManipulationDto = {
      userRequest: this.form.get('userRequest').value,
      botResponse: this.form.get('botResponse').value,
      nextIds: this.form.get('nextIds').value
    }
    
    this.chatsService.createChat(chat).subscribe(
       () => { this.submitted = false },
       (error) => { 
         console.log('Error when creating chat', error)
        this.submitted = false 
      }
    )
      
    this.form.reset()
    this.router.navigate(['/admin', 'chats'])
    this.alert.success('Chat has been created')
  }

}
