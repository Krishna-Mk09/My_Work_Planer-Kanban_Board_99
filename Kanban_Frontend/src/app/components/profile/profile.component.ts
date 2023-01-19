import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../model/user/User";
import {ProfileimageService} from "../../services/profileimage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {KanbanService} from "../../services/kanban.service";
import {NotificationService} from "../../services/notification.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-profile', templateUrl: './profile.component.html', styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  image?: File
  wantToUpdate: boolean = false;
  currentUser?: User;
  imageURL?: string;
  isFileValid?: boolean;

  constructor(
    public authentication: AuthenticationService,
    private profileService: ProfileimageService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  updateUser(): void {
    console.log(this.currentUser)
    this.authentication.updateUserProfile(this.currentUser!).subscribe({
      next: () => this.snackBar.open("Profile Update Successfully !!!", "Done", {duration: 3000}),
      error: (error) => console.log(error)
    });
  }

  uploadProfilePicture() {
    if (this.isFileValid) {
      this.profileService.uploadProfilePicture(this.image!).subscribe({
        next: (response: any) => {
          this.imageURL = response['secure_url'];
          this.snackbar.open("Profile Image updated successfully!", "Close", {duration: 3000});
        }, error: (err) => console.log(err)
      });
      setTimeout(() => {
        this.currentUser!.imageURL = this.imageURL!;
        this.updateUser();
      }, 3000);
    }
  }

  updateImage(event: any) {
    this.image = event.target.files![0];
    this.isFileValid = this.image?.size! <= 1024000;
    if (!this.isFileValid) this.snackbar.open("File is too big!", "Close", {duration: 3000});
  }

  ngOnInit(): void {
    this.currentUser = this.authentication.currentUser;
    setTimeout(() => {
      this.currentUser = this.authentication.currentUser;
    }, 1000)
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeleteAccountPopupDialog, {
      width: '300px', enterAnimationDuration, exitAnimationDuration,
    });
  }
}


@Component({
  selector: 'delete-account-popup', templateUrl: './delete-account-popup.html',
})
export class DeleteAccountPopupDialog {
  constructor(public dialogRef: MatDialogRef<DeleteAccountPopupDialog>, private kanbanService: KanbanService, private notificationService: NotificationService, public authentication: AuthenticationService) {
  }

  onNoClick() {
    this.dialogRef.close(null);
  }

  deleteAccount() {
    setTimeout(() => {
      this.authentication.deleteUserAccount();
      this.kanbanService.deleteKanban();
      this.notificationService.deleteNotification();
      this.authentication.logoutUser();
    }, 1000);
  }
}
