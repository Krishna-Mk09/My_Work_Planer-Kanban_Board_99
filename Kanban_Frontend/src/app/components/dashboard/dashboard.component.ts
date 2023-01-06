import {Component, Inject, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {KanbanService} from "../../services/kanban.service";
import {Kanban} from "../../model/kanban/Kanban";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Board} from "../../model/kanban/Board";

export interface DialogData {
  boardName: string;
  columnName: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  currentUserKanban?: Kanban;
  boardToDisplay?: Board;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private kanbanService: KanbanService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.kanbanService.getKanbanByEmail();
    setTimeout(() => {
      this.currentUserKanban = this.kanbanService.currentUserKanban;
      console.log(this.currentUserKanban);
    }, 1000);
  }

  addBoardToKanban() {
    const dialogRef = this.dialog.open(AddBoardPopupDialog, {
      width: '250px',
      data: {boardName: ''}
    });
    dialogRef.afterClosed().subscribe({
      next: (result: string) => {
        this.currentUserKanban?.boards?.push({boardName: result, columns: [], members: []});
        this.kanbanService.updateKanban(this.currentUserKanban!);
      }
    });
  }

  addColumnToBoard(board: Board) {
    const dialogRef = this.dialog.open(AddColumnPopupDialog, {
      width: '250px',
      data: {columnName: ''}
    });
    dialogRef.afterClosed().subscribe({
      next: (result: string) => {
        this.currentUserKanban?.boards?.forEach((b: Board) => {
          if (b.boardName === board.boardName) {
            b.columns?.push({columnName: result, tasks: []});
          }
        });
        this.kanbanService.updateKanban(this.currentUserKanban!);
      }
    })
  }

  displayBoard(board: Board) {
    this.boardToDisplay = board;
  }
}

@Component({
  selector: 'add-board-popup',
  templateUrl: './add-board-popup.html'
})
export class AddBoardPopupDialog {
  constructor(public dialogRef: MatDialogRef<AddBoardPopupDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'add-column-popup',
  templateUrl: './add-column-popup.html'
})
export class AddColumnPopupDialog {
  constructor(public dialogRef: MatDialogRef<AddColumnPopupDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
