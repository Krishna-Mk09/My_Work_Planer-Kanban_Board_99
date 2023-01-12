import {Component, Inject, OnInit} from '@angular/core';
import {KanbanService} from "../../services/kanban.service";
import {Kanban} from "../../model/kanban/Kanban";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Board} from "../../model/kanban/Board";
import {Column} from "../../model/kanban/Column";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Task} from "../../model/kanban/Task";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../model/user/User";

export interface DialogData {
  boardToDisplay: Board;
  boardName: string;
  columnName: string;
  taskName: string;
  taskDescription: string;
  taskPriority: string;
  taskStatus: string;
  taskStartDate: Date;
  taskDueDate: Date;
  taskAssignee: string;
  email: string;
}

@Component({
  selector: 'app-dashboard', templateUrl: './dashboard.component.html', styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUserKanban?: Kanban;
  boardToDisplay?: Board;
  profileOfAssignee?:User;

  constructor(
    private kanbanService: KanbanService,
    public dialog: MatDialog,
    private authentication: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.kanbanService.getCurrentUserKanban();
    setTimeout(() => {
      this.currentUserKanban = this.kanbanService.currentUserKanban;
      this.fetchDetailsOfTaskAssignee();
      console.log(this.currentUserKanban);
    }, 1000);
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
      },
      disableClose: true
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

  displayBoard(board: Board) {
    this.boardToDisplay = board;
  }

  drop(event: CdkDragDrop<Task[] | undefined>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data!, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data!, event.container.data!, event.previousIndex!, event.currentIndex!,);
    }
    this.kanbanService.updateKanban(this.currentUserKanban!);
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
}

// Component for adding a new board to the Kanban
@Component({
  selector: 'add-board-popup', templateUrl: './add-board-popup.html'
})
export class AddBoardPopupDialog {
  constructor(public dialogRef: MatDialogRef<AddBoardPopupDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick() {
    this.dialogRef.close(null);
  }
}

// Component for adding a column to a board
@Component({
  selector: 'add-column-popup', templateUrl: './add-column-popup.html'
})
export class AddColumnPopupDialog {
  constructor(public dialogRef: MatDialogRef<AddColumnPopupDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick() {
    this.dialogRef.close(null);
  }
}

// Component for adding a task to a column
@Component({
  selector: 'add-task-popup', templateUrl: './add-task-popup.html'
})
export class AddTaskPopupDialog implements OnInit {
  priorities = ['Low', 'Medium', 'High'];
  boardMembers?: string[];

  constructor(public dialogRef: MatDialogRef<AddTaskPopupDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick() {
    this.dialogRef.close(null);
  }


  ngOnInit(): void {
    this.boardMembers = this.data.boardToDisplay?.members;
  }
}

@Component({
  selector: 'add-member-popup', templateUrl: './add-member-popup.html'
})
export class AddMemberPopupDialog implements OnInit {
  allEmails?: string[];
  isEmailValid?: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddMemberPopupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private authentication: AuthenticationService
  ) {
  }

  onNoClick() {
    this.dialogRef.close(null);
  }

  checkEmail() {
    this.isEmailValid = this.allEmails?.includes(this.data.email, 0);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.authentication.getAllEmails().subscribe({
        next: (result) => {
          this.allEmails = result;
        }
      });
    }, 1000);
  }
}
