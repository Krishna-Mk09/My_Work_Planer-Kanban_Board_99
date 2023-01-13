import {Board} from "../../model/kanban/Board";

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
