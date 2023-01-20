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

  /**
   * This function save a kanban object in the database
   * @param kanban The kanban object to save
   * @return Observable with the kanban object saved
   */
  saveKanban(kanban: Kanban) {
    return this.httpClient.post<Kanban>(`${this.endPointURL}/save-kanban`, kanban);
  }

  /**
   * This function fetches the current user's kanban from the database
   */
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

  /**
   * This function fetched the kanban for a user by email
   * @param email The email of the user
   * @return Observable with the kanban for the user
   */
  getKanbanByEmail(email: string) {
    return this.httpClient.get<Kanban>(`${this.endPointURL}/get-kanban/${email}`);
  }

  /**
   * This function updates the current user's kanban in the database
   * @param kanban The kanban object to update
   */
  updateKanban(kanban: Kanban) {
    return this.httpClient.put<Kanban>(
      `${this.endPointURL}/update-kanban`, kanban)
      .subscribe({
        next: (response: Kanban) => this.currentUserKanban = response,
        error: (err) => console.log(err)
      });
  }

  /**
   * This function deletes a kanban object from the database
   */
  deleteKanban() {
    return this.httpClient.delete(
      `${this.endPointURL}/delete-kanban/${localStorage.getItem('user_email')}`).subscribe({
      next: () => console.log("Kanban deleted")
    })
  }

  /**
   * This function adds a member to the current user's kanban board
   * @param kanban The kanban object to update
   * @param email The email of the member to add
   * @return Observable with the kanban object updated
   */
  addMemberToBoard(kanban: Kanban, email: string) {
    return this.httpClient.put<Kanban>(
      `${this.endPointURL}/add-member-to-board/${email}`, kanban);
  }

  /**
   * This function sends a message via RabbitMQ to the user with the email provided
   * @param message The message to send
   * @param email The email of the user to send the message to
   */
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
