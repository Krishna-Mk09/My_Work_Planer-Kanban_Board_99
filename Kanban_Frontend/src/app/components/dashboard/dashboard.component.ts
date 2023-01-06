import {Component, Inject, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {KanbanService} from "../../services/kanban.service";
import {Kanban} from "../../model/kanban/Kanban";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  boardName: string;
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

  constructor(
    private breakpointObserver: BreakpointObserver,
    private kanbanService: KanbanService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.kanbanService.getKanbanByEmail();
    this.currentUserKanban = this.kanbanService.currentUserKanban;
  }

  addBoardToKanban() {
    const dialogRef = this.dialog.open(AddBoardPopupDialog, {
      width: '250px',
      data: {boardName: ''}
    });
    dialogRef.afterClosed().subscribe({
      next: (result: string) => {
        this.currentUserKanban?.boards?.push({boardName: result, columns: [], members: []});
      }
    });
    console.log(this.currentUserKanban);
    // this.kanbanService.updateKanban(this.currentUserKanban!);
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
