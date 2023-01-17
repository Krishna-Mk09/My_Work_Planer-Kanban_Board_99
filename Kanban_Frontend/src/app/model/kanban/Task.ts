export type Task = {
  name?: string,
  description?: string,
  priority?: string,
  startDate?: Date,
  dueDate?: Date,
  assigneeEmail?: string,
  assigneeName?: string | null,
  assigneeImageURL?: string | null
}
