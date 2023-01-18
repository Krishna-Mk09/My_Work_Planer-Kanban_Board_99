import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthenticationService} from "../../../services/authentication.service";
import {DialogData} from "../dialog.data";
import {Kanban} from "../../../model/kanban/Kanban";
import {KanbanService} from "../../../services/kanban.service";
import {Board} from "../../../model/kanban/Board";
import {Column} from "../../../model/kanban/Column";
import {User} from "../../../model/user/User";


// Component for adding a new board to the Kanban
@Component({
  selector: 'add-board-popup', templateUrl: './add-board-popup.html'
})
export class AddBoardPopupDialog implements OnInit {
  currentUserKanban?: Kanban;
  isBoardNameValid?: boolean;
  boardNames: String[] = [];
  messageToDisplay?: string;

  constructor(
    public dialogRef: MatDialogRef<AddBoardPopupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private kanbanService: KanbanService) {
  }

  checkBoardName() {
    this.isBoardNameValid = !this.boardNames.includes(this.data.boardName, 0);
  }

  onNoClick() {
    this.dialogRef.close(null);
  }

  ngOnInit(): void {
    this.currentUserKanban = this.kanbanService.currentUserKanban;
    this.messageToDisplay = this.data.messageToDisplay;
    this.currentUserKanban?.boards?.forEach((b: Board) => {
      this.boardNames.push(b.boardName!);
    });
    this.boardNames.push("");
  }
}

// Component for adding a column to a board
@Component({
  selector: 'add-column-popup', templateUrl: './add-column-popup.html'
})
export class AddColumnPopupDialog implements OnInit {
  boardToDisplay?: Board;
  isColumnValid?: boolean;
  columnNames: String[] = [];
  messageToDisplay?: string;

  constructor(
    public dialogRef: MatDialogRef<AddColumnPopupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }

  checkColumnName() {
    this.isColumnValid = !this.columnNames.includes(this.data.columnName, 0);
  }

  onNoClick() {
    this.dialogRef.close(null);
  }

  ngOnInit(): void {
    this.boardToDisplay = this.data.boardToDisplay;
    this.messageToDisplay = this.data.messageToDisplay;
    this.boardToDisplay.columns?.forEach((c: Column) => {
      this.columnNames.push(c.columnName!);
    });
    this.columnNames.push("");
  }
}

// Component for adding a task to a column
@Component({
  selector: 'add-task-popup', templateUrl: './add-task-popup.html'
})
export class AddTaskPopupDialog implements OnInit {
  priorities = ['Low', 'Medium', 'High'];
  boardMembers?: string[];
  users?: User[] = [];
  boardToDisplay?: Board;
  isTaskNameValid?: boolean;
  taskNames: String[] = [];
  messageToDisplay?: string;
  currentDate: Date = new Date();
  isTaskAssigneeValid?: boolean = true;
  minimumDate: Date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
  numberOfTasksAssignedToUsers: Map<string, number> = new Map<string, number>();

  constructor(
    public dialogRef: MatDialogRef<AddTaskPopupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private authenticationService: AuthenticationService) {
  }

  checkTaskName() {
    this.isTaskNameValid = !this.taskNames.includes(this.data.taskName, 0);
  }

  onNoClick() {
    this.dialogRef.close(null);
  }


  ngOnInit(): void {
    console.log(this.isTaskAssigneeValid);
    this.boardToDisplay = this.data.boardToDisplay;
    this.boardMembers = this.data.boardToDisplay?.members;
    this.numberOfTasksAssignedToUsers = this.data.numberOfTasksAssignedToUsers;
    console.log(this.numberOfTasksAssignedToUsers);
    this.boardMembers?.forEach((m: string) => {
      this.authenticationService.getUserByEmail(m).subscribe((user: User) => {
        this.users?.push(user);
      });
    });
    this.messageToDisplay = this.data.messageToDisplay;
    this.boardToDisplay.columns?.forEach((c: Column) => {
      c.tasks?.forEach((t) => {
        if (t.name === this.data.taskName) {
          this.taskNames.push("");
        } else {
          this.taskNames.push(t.name!);
        }
      });
    });
    this.isTaskNameValid = !this.taskNames.includes(this.data.taskName, 0);
  }

  checkTaskAssignee() {
    if (this.numberOfTasksAssignedToUsers.get(this.data.taskAssignee!)! >= 3) {
      this.isTaskAssigneeValid = false;
    } else {
      this.isTaskAssigneeValid = true;
    }
    console.log("Is valid - " + this.isTaskAssigneeValid);
  }
}

@Component({
  selector: 'add-member-popup', templateUrl: './add-member-popup.html'
})
export class AddMemberPopupDialog implements OnInit {
  allEmails?: string[];
  isEmailValid?: boolean;

  constructor(public dialogRef: MatDialogRef<AddMemberPopupDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private authentication: AuthenticationService) {
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
