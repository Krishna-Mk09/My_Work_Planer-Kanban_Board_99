import {Column} from "./Column"

export type Board = {
  boardName?: string,
  columns?: Column[],
  members?: string[]
}
