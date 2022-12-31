package com.kanban.kanbanservice.domain;

import java.util.Arrays;
import java.util.Date;
import java.util.Objects;

public class Task {
    private String name;
    private String description;
    private String priority;
    private String status;
    private Date startDate;
    private Date dueDate;
    private String[] members;

    public Task() {
    }

    public Task(String name, String description, String priority, String status, Date startDate, Date dueDate, String[] members) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.members = members;
    }

    public String[] getMembers() {
        return members;
    }

    public void setMembers(String[] members) {
        this.members = members;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Task)) return false;
        Task task = (Task) o;
        return Objects.equals(getName(), task.getName()) && Objects.equals(getDescription(), task.getDescription()) && Objects.equals(getPriority(), task.getPriority()) && Objects.equals(getStatus(), task.getStatus()) && Objects.equals(getStartDate(), task.getStartDate()) && Objects.equals(getDueDate(), task.getDueDate()) && Arrays.equals(getMembers(), task.getMembers());
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(getName(), getDescription(), getPriority(), getStatus(), getStartDate(), getDueDate());
        result = 31 * result + Arrays.hashCode(getMembers());
        return result;
    }

    @Override
    public String toString() {
        return "Task{" +
            "name='" + name + '\'' +
            ", description='" + description + '\'' +
            ", priority='" + priority + '\'' +
            ", status='" + status + '\'' +
            ", startDate=" + startDate +
            ", dueDate=" + dueDate +
            ", members=" + Arrays.toString(members) +
            '}';
    }
}
