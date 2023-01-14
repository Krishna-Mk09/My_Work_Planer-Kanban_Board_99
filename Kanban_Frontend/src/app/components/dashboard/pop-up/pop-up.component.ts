import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthenticationService} from "../../../services/authentication.service";
import {DialogData} from "../dialog.data";
import {Kanban} from "../../../model/kanban/Kanban";
import {KanbanService} from "../../../services/kanban.service";
import {Board} from "../../../model/kanban/Board";
import {Column} from "../../../model/kanban/Column";


// Component for adding a new board to the Kanban
@Component({
  selector: 'add-board-popup', templateUrl: './add-board-popup.html'
})
export class AddBoardPopupDialog implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<AddBoardPopupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private kanbanService: KanbanService) {
  }

  currentUserKanban?: Kanban;
  isBoardNameValid?: boolean;
  boardNames: String[] = [];
  messageToDisplay?: string;

  checkBoardName() {
    this.isBoardNameValid = !this.boardNames.includes(this.data.boardName,0);
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
export class AddColumnPopupDialog implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<AddColumnPopupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }
  boardToDisplay?: Board;
  isColumnValid?: boolean;
  columnNames: String[] = [];
  messageToDisplay?: string;

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
  boardToDisplay?: Board;
  isTaskNameValid?: boolean;
  taskNames: String[] = [];
  messageToDisplay?: string;
  currentDate: Date = new Date();
  minimumDate:Date = new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),this.currentDate.getDate());


  constructor(
    public dialogRef: MatDialogRef<AddTaskPopupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  checkTaskName() {
    this.isTaskNameValid = !this.taskNames.includes(this.data.taskName, 0);
  }

  onNoClick() {
    this.dialogRef.close(null);
  }


  ngOnInit(): void {
    this.boardToDisplay = this.data.boardToDisplay;
    this.boardMembers = this.data.boardToDisplay?.members;
    this.messageToDisplay = this.data.messageToDisplay;
    this.boardToDisplay.columns?.forEach((c: Column) => {
      c.tasks?.forEach((t) => {
        this.taskNames.push(t.name!);
      });
    });
    this.taskNames.push("");
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
