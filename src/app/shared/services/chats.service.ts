import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chat, ChatForManipulationDto } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private http: HttpClient) { }

  getChats(): Observable<Chat[]>{
    return this.http.get<Chat[]>(`${environment.serverUrl}/api/chats`)
  }

  createChat(chat: ChatForManipulationDto): Observable<void>{
    return this.http.post<void>(`${environment.serverUrl}/api/chats`, chat)
  }

  getChatById(id: number): Observable<Chat>{
    return this.http.get<Chat>(`${environment.serverUrl}/api/chats/${id}`)
  }

  deleteChat(id: number): Observable<void>{
    return this.http.delete<void>(`${environment.serverUrl}/api/chats/${id}`)
  }

  updateChat(id: number, chat: ChatForManipulationDto): Observable<void>{
    return this.http.put<void>(`${environment.serverUrl}/api/chats/${id}`, chat)
  }
}
