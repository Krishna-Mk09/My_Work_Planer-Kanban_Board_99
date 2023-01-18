import {Component, OnInit} from '@angular/core';
import {KanbanService} from "../../services/kanban.service";
import {Kanban} from "../../model/kanban/Kanban";
import {MatDialog} from "@angular/material/dialog";
import {Board} from "../../model/kanban/Board";
import {Column} from "../../model/kanban/Column";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Task} from "../../model/kanban/Task";
import {AuthenticationService} from "../../services/authentication.service";
import {
  AddBoardPopupDialog,
  AddColumnPopupDialog,
  AddMemberPopupDialog,
  AddTaskPopupDialog
} from "./pop-up/pop-up.component";
import {DialogData} from "./dialog.data";
import {User} from "../../model/user/User";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-dashboard', templateUrl: './dashboard.component.html', styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUserKanban?: Kanban;
  boardToDisplay?: Board;
  boardMembers: User[] = [];
  numberOfTasksAssignedToUser: Map<string, number> = new Map<string, number>();


  constructor(
    private kanbanService: KanbanService,
    public dialog: MatDialog,
    private authentication: AuthenticationService,
    private snackBar: MatSnackBar) {
  }

  fetchDetailsOfBoardMembers() {
    this.boardMembers = [];
    this.boardToDisplay?.members?.forEach((memberEmail: string) => {
      this.authentication.getUserByEmail(memberEmail).subscribe({
        next: (response: User) => {
          this.boardMembers.push(response);
        }
      })
    })
  }

  displayBoard(board: Board) {
    this.boardToDisplay = board;
    this.fetchDetailsOfBoardMembers();
    this.getNumberOfTasksAssignedToUser();
  }

  addBoardToKanban() {
    const dialogRef = this.dialog.open(AddBoardPopupDialog, {
      width: '250px',
      data: {
        boardName: null,
        messageToDisplay: "Add"
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe({
      next: (result: string) => {
        if (result !== null) {
          this.currentUserKanban?.boards?.push({boardName: result, columns: [], members: []});
          this.kanbanService.updateKanban(this.currentUserKanban!);
        }
      }
    });
  }

  addColumnToBoard() {
    const dialogRef = this.dialog.open(AddColumnPopupDialog, {
      width: '250px',
      data: {
        columnName: '',
        boardToDisplay: this.boardToDisplay,
        messageToDisplay: "Add"
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe({
      next: (result: string) => {
        if (result !== null) {
          this.currentUserKanban?.boards?.forEach((b: Board) => {
            if (b.boardName === this.boardToDisplay?.boardName) {
              b.columns?.push({columnName: result, tasks: []});
            }
          });
          this.kanbanService.updateKanban(this.currentUserKanban!);
        }
      }
    })
  }

  addTaskToColumn(column: Column) {
    const dialogRef = this.dialog.open(AddTaskPopupDialog, {
      width: '300px', data: {
        taskName: '',
        taskDescription: '',
        taskAssignee: '',
        taskStartDate: '',
        taskDueDate: '',
        taskPriority: '',
        taskStatus: '',
        boardToDisplay: this.boardToDisplay,
        messageToDisplay: "Add",
        numberOfTasksAssignedToUsers: this.numberOfTasksAssignedToUser
      }, disableClose: true
    });
    dialogRef.afterClosed().subscribe({
      next: (result: DialogData) => {
        if (result !== null) {
          this.currentUserKanban?.boards?.forEach((b: Board) => {
            if (b.boardName === this.boardToDisplay?.boardName) {
              b.columns?.forEach((c: any) => {
                if (c.columnName === column.columnName) {
                  c.tasks?.push({
                    name: result.taskName,
                    description: result.taskDescription,
                    assigneeEmail: result.taskAssignee,
                    startDate: result.taskStartDate,
                    dueDate: result.taskDueDate,
                    priority: result.taskPriority
                  });
                  this.getNumberOfTasksAssignedToUser();
                }
              });
            }
          });
          this.kanbanService.updateKanban(this.currentUserKanban!);
          this.fetchDetailsOfTaskAssignee();
          // if (result.taskAssignee !== null) {
          //   this.authentication.getUserByEmail(result.taskAssignee).subscribe({
          //     next: (response: User) => {
          //       response.numberOfTaskAssigned! += 1;
          //       if (response.numberOfTaskAssigned! < 4) {
          //         this.authentication.updateUserProfile(response).subscribe({
          //           error: (err) => console.log(err)
          //         });
          //       }
          //     }
          //   });
          //   this.kanbanService.sendMessageToMember(`You have been assigned a task of ${result.taskName} in the board ${this.boardToDisplay?.boardName} by ${localStorage.getItem('user_firstname')}`, result.taskAssignee);
          // }
        }
      }
    })
  }

  addMembersToBoard() {
    const dialogRef = this.dialog.open(AddMemberPopupDialog, {
      width: '250px', data: {email: undefined}, disableClose: true
    });
    dialogRef.beforeClosed().subscribe({
      next: (result: string) => {
        if (result !== null) {
          this.currentUserKanban?.boards?.forEach((b: Board) => {
            if (b.boardName === this.boardToDisplay?.boardName) {
              if (b.members?.includes(result)) {
                this.snackBar.open("Member already exists in this board", "Close", {duration: 3000});
              } else {
                b.members?.push(result);
                this.snackBar.open("Member added successfully", "Close", {duration: 3000});
                this.kanbanService.sendMessageToMember(`You have been added to the board ${this.boardToDisplay?.boardName} by ${localStorage.getItem('user_firstname')}`, result);
              }
            }
          });
          this.kanbanService.addMemberToBoard(this.currentUserKanban!, result).subscribe({
            next: (result) => console.log(result)
          })
          this.fetchDetailsOfBoardMembers();
        }
      }
    })
  }

  fetchDetailsOfTaskAssignee() {
    this.currentUserKanban?.boards?.forEach((b: Board) => {
      b.columns?.forEach((c: Column) => {
        c.tasks?.forEach((t: Task) => {
          if (t.assigneeEmail != null && t.assigneeEmail !== "") {
            this.authentication.getUserByEmail(t.assigneeEmail!).subscribe({
              next: (response) => {
                t.assigneeName = response.firstName;
                t.assigneeImageURL = response.imageURL;
              }
            })
          }
        })
      })
    })
  }

  deleteBoard(boardName: string | undefined) {
    let boardMembers: string[] = []
    this.currentUserKanban?.boards?.forEach((b: Board) => {
      if (b.boardName === boardName) {
        boardMembers = b.members!;
      }
    });
    if (boardMembers.length != 0) {
      boardMembers.forEach((member: string) => {
        this.kanbanService.getKanbanByEmail(member).subscribe({
          next: (result: Kanban) => {
            result.boards?.forEach((b: Board) => {
              if (b.boardName === boardName) {
                result.boards?.splice(result.boards.indexOf(b), 1);
                this.kanbanService.saveKanban(result).subscribe({
                  error: (err) => console.log(err)
                });
              }
            })
            setTimeout(() => {
              window.location.reload();
            }, 100);
          }, error: (err) => console.log(err)
        });
      })
    } else {
      this.currentUserKanban?.boards?.forEach((b: Board, index: number) => {
        if (b.boardName === boardName) {
          this.currentUserKanban?.boards?.splice(index, 1);
        }
      });
      this.kanbanService.updateKanban(this.currentUserKanban!);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }

  deleteColumn(column: Column) {
    this.currentUserKanban?.boards?.forEach((b: Board) => {
      if (b.boardName === this.boardToDisplay?.boardName) {
        b.columns?.forEach((c: Column, index: number) => {
          if (c.columnName === column.columnName) {
            b.columns?.splice(index, 1);
          }
        })
      }
    });
    this.kanbanService.updateKanban(this.currentUserKanban!);
  }

  deleteTask(task: Task) {
    this.currentUserKanban?.boards?.forEach((b: Board) => {
      if (b.boardName === this.boardToDisplay?.boardName) {
        b.columns?.forEach((c: Column) => {
          c.tasks?.forEach((t: Task, index: number) => {
            if (t.name === task.name) {
              c.tasks?.splice(index, 1);
            }
          })
        })
      }
    });
    this.kanbanService.updateKanban(this.currentUserKanban!);
  }

  drop(event: CdkDragDrop<Task[] | undefined>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data!, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data!, event.container.data!, event.previousIndex!, event.currentIndex!,);
    }
    this.kanbanService.updateKanban(this.currentUserKanban!);
  }

  ngOnInit(): void {
    this.kanbanService.getCurrentUserKanban();
    setTimeout(() => {
      this.currentUserKanban = this.kanbanService.currentUserKanban;
      this.fetchDetailsOfTaskAssignee();
      console.log(this.currentUserKanban);
    }, 1000);
  }

  editColumnName(column: Column) {
    const dialogRef = this.dialog.open(AddColumnPopupDialog, {
      width: '250px', data: {
        columnName: column.columnName,
        boardToDisplay: this.boardToDisplay,
        messageToDisplay: "Edit"
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe({
      next: (result: string) => {
        if (result != null) {
          this.currentUserKanban?.boards?.forEach((b: Board) => {
            if (b.boardName === this.boardToDisplay?.boardName) {
              b.columns?.forEach((c: Column) => {
                if (c.columnName === column.columnName) {
                  c.columnName = result;
                }
              })
            }
          })
          this.kanbanService.updateKanban(this.currentUserKanban!);
        }
      }
    });
  }

  editTask(task: Task, columnName: string) {
    const dialogRef = this.dialog.open(AddTaskPopupDialog, {
      width: '300px',
      data: {
        taskName: task.name,
        taskDescription: task.description,
        taskAssignee: task.assigneeEmail,
        taskStartDate: task.startDate,
        taskDueDate: task.dueDate,
        taskPriority: task.priority,
        boardToDisplay: this.boardToDisplay,
        messageToDisplay: "Edit",
        numberOfTasksAssignedToUsers: this.numberOfTasksAssignedToUser
      },
      disableClose: true
    });
    dialogRef.beforeClosed().subscribe({
      next: (result: DialogData) => {
        if (result != null) {
          this.currentUserKanban?.boards?.forEach((b: Board) => {
            if (b.boardName === this.boardToDisplay?.boardName) {
              b.columns?.forEach((c: Column) => {
                if (c.columnName === columnName) {
                  c.tasks?.forEach((t: Task) => {
                    if (t.name === task.name) {
                      t.name = result.taskName;
                      t.description = result.taskDescription;
                      t.assigneeEmail = result.taskAssignee;
                      t.startDate = result.taskStartDate;
                      t.dueDate = result.taskDueDate;
                      t.priority = result.taskPriority;
                      this.getNumberOfTasksAssignedToUser();
                    }
                  })
                }
              })
            }
          })
          this.kanbanService.updateKanban(this.currentUserKanban!);
        }
      }
    });
  }

  editBoardName() {
    const dialogRef = this.dialog.open(AddBoardPopupDialog, {
      width: '250px', data: {
        boardName: this.boardToDisplay?.boardName,
        messageToDisplay: "Edit"
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe({
      next: (result: string) => {
        if (result != null) {
          this.currentUserKanban?.boards?.forEach((b: Board) => {
            if (b.boardName === this.boardToDisplay?.boardName) {
              b.boardName = result;
            }
          })
          this.kanbanService.updateKanban(this.currentUserKanban!);
        }
      }
    });
  }

  getNumberOfTasksAssignedToUser() {
    this.numberOfTasksAssignedToUser = new Map<string, number>();
    this.currentUserKanban?.boards?.forEach((b: Board) => {
      if (b.boardName === this.boardToDisplay?.boardName) {
        b.columns?.forEach((c: Column) => {
          c.tasks?.forEach((t: Task) => {
            if (this.numberOfTasksAssignedToUser.has(t.assigneeEmail!) && t.assigneeEmail != undefined && t.assigneeEmail != "") {
              this.numberOfTasksAssignedToUser.set(t.assigneeEmail!, this.numberOfTasksAssignedToUser.get(t.assigneeEmail!)! + 1);
            } else if (t.assigneeEmail != undefined && t.assigneeEmail != "") {
              this.numberOfTasksAssignedToUser.set(t.assigneeEmail!, 1);
            }
          })
        })
      }
    });
  }
}
