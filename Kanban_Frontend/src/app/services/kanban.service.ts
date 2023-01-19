import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Kanban} from "../model/kanban/Kanban";
import {Board} from "../model/kanban/Board";
import {Column} from "../model/kanban/Column";
import {Task} from "../model/kanban/Task";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  endPointURL: string = "http://localhost:9005/kanban";
  currentUserKanban?: Kanban;

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService) {
  }

  saveKanban(kanban: Kanban) {
    return this.httpClient.post<Kanban>(`${this.endPointURL}/save-kanban`, kanban);
  }

  getCurrentUserKanban() {
    return this.httpClient.get<Kanban>(
      `${this.endPointURL}/get-kanban/${localStorage.getItem('user_email')}`)
      .subscribe({
          next: (response: Kanban) => {
            response.boards?.forEach((b: Board) => {
              b.columns?.forEach((c: Column) => {
                c.tasks?.forEach((t: Task) => {
                  t.startDate = new Date(t.startDate!);
                  t.dueDate = new Date(t.dueDate!);
                })
              })
            })
            this.currentUserKanban = response;
          },
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
      `${this.endPointURL}/delete-kanban/${localStorage.getItem('user_email')}`).subscribe({
      next: () => console.log("Kanban deleted")
    })
  }

  addMemberToBoard(kanban: Kanban, email: string) {
    return this.httpClient.put<Kanban>(
      `${this.endPointURL}/add-member-to-board/${email}`, kanban);
  }

  sendMessageToMember(message: string, email: string) {
    let messageDTO = {
      email: email,
      message: message
    };
    return this.httpClient.put(`${this.endPointURL}/send-message`, messageDTO).subscribe({
      next: () => this.notificationService.getNotification(),
      error: (err) => console.log(err)
    });
  }
}
