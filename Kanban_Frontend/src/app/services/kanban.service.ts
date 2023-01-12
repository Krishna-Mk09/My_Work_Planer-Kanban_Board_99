import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Kanban} from "../model/kanban/Kanban";

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  endPointURL: string = "http://localhost:9005/kanban";
  currentUserKanban?: Kanban;

  constructor(private httpClient: HttpClient) {
  }

  saveKanban(kanban: Kanban) {
    return this.httpClient.post<Kanban>(`${this.endPointURL}/save-kanban`, kanban);
  }

  getCurrentUserKanban() {
    return this.httpClient.get<Kanban>(
      `${this.endPointURL}/get-kanban/${localStorage.getItem('user_email')}`)
      .subscribe({
          next: (response: Kanban) => this.currentUserKanban = response,
          error: (error) => console.log(error)
        }
      )
  }

  getKanbanByEmail(email: string) {
    return this.httpClient.get<Kanban>(`${this.endPointURL}/get-kanban/${email}`);
  }

  updateKanban(kanban: Kanban) {
    return this.httpClient.put<Kanban>(
      `${this.endPointURL}/update-kanban`, kanban)
      .subscribe({
        next: (response: Kanban) => this.currentUserKanban = response,
        error: (err) => console.log(err)
      });
  }

  deleteKanban() {
    return this.httpClient.delete(
      `${this.endPointURL}/delete-kanban/${localStorage.getItem('user_email')}`);
  }

  addMemberToBoard(kanban: Kanban, email: string) {
    return this.httpClient.put<Kanban>(
      `${this.endPointURL}/add-member-to-board/${email}`, kanban);
  }

  // TODO: Send message to Notification
}
