import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UploadDialogComponent } from '../../shared/upload-dialog/upload-dialog.component';
import { LabelDefinitionPopupComponent } from '../../shared/label-definition-popup/label-definition-popup.component';
import { UserConfirmationComponent } from '../guards/user-confirmation/user-confirmation.component';
import { UploadService } from './upload.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog, private uploadService: UploadService) {}

  openUserConfirmationModal(messages: string[], yesButtonMessage: string, noButtonMessage: string) {
    return this.dialog.open(UserConfirmationComponent, {
      data: {
        messages: messages,
        yesMessage: yesButtonMessage,
        noMessage: noButtonMessage
      }
    });
  }

  openLabelDefinitionDialog(labelName: String, labelDefinition: String) {
    return this.dialog.open(LabelDefinitionPopupComponent, {
      data: {
        header: labelName,
        body: labelDefinition
      }
    });
  }

  openUploadConfirmationDialog(file: File) {
    let preview = undefined;
    if (this.uploadService.isImageFile(file.name)) {
      preview = new Observable<string | ArrayBuffer>((observer) => {
        const reader = new FileReader();
        reader.onload = () => {
          observer.next(reader.result);
        };
        reader.readAsDataURL(file);
      });
    }
    return this.dialog.open(UploadDialogComponent, {
      data: {
        name: file.name,
        preview
      }
    });
  }
}
