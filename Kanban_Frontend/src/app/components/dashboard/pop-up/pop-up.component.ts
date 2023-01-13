import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthenticationService} from "../../../services/authentication.service";
import {DialogData} from "../dialog.data";
import {Kanban} from "../../../model/kanban/Kanban";
import {KanbanService} from "../../../services/kanban.service";
import {Board} from "../../../model/kanban/Board";


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

  checkBoardName() {
    let boardNames: String[] = [];
    this.currentUserKanban?.boards?.forEach((b: Board) => {
      boardNames.push(b.boardName!);
    });
    this.isBoardNameValid = boardNames.includes(this.data.boardName,0);
  }

  onNoClick() {
    this.dialogRef.close(null);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.currentUserKanban = this.kanbanService.currentUserKanban;
    },1000)
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
