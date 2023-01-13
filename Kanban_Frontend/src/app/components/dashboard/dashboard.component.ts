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


@Component({
  selector: 'app-dashboard', templateUrl: './dashboard.component.html', styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUserKanban?: Kanban;
  boardToDisplay?: Board;

  constructor(
    private kanbanService: KanbanService,
    public dialog: MatDialog,
    private authentication: AuthenticationService) {
  }

  displayBoard(board: Board) {
    this.boardToDisplay = board;
  }

  addBoardToKanban() {
    const dialogRef = this.dialog.open(AddBoardPopupDialog, {
      width: '250px', data: {boardName: null}, disableClose: true
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

  addColumnToBoard(board: Board) {
    const dialogRef = this.dialog.open(AddColumnPopupDialog, {
      width: '250px', data: {columnName: ''}, disableClose: true
    });
    dialogRef.afterClosed().subscribe({
      next: (result: string) => {
        if (result !== null) {
          this.currentUserKanban?.boards?.forEach((b: Board) => {
            if (b.boardName === board.boardName) {
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
      width: '250px', data: {
        taskName: '',
        taskDescription: '',
        taskAssignee: '',
        taskStartDate: '',
        taskDueDate: '',
        taskPriority: '',
        taskStatus: '',
        boardToDisplay: this.boardToDisplay
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
                    priority: result.taskPriority,
                    status: result.taskStatus
                  });
                }
              });
            }
          });
          this.kanbanService.updateKanban(this.currentUserKanban!);
          this.fetchDetailsOfTaskAssignee();
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
              b.members?.push(result)
            }
          })
          this.kanbanService.addMemberToBoard(this.currentUserKanban!, result).subscribe({
            next: (result) => console.log(result)
          })
        }
      }
    })
  }

  fetchDetailsOfTaskAssignee() {
    this.currentUserKanban?.boards?.forEach((b: Board) => {
      b.columns?.forEach((c: Column) => {
        c.tasks?.forEach((t: Task) => {
          this.authentication.getUserByEmail(t.assigneeEmail!).subscribe({
            next: (response) => {
              t.assigneeName = response.firstName;
              t.assigneeImageURL = response.imageURL;
            }
          })
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
            }, 100)
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
}
