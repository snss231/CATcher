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
    const preview = new Observable<string | ArrayBuffer>((observer) => {
      if (this.uploadService.isImageFile(file.name)) {
        const reader = new FileReader();
        reader.onload = () => {
          observer.next(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        observer.next(
          'https://media.istockphoto.com/photos/european-short-haired-cat-picture-id1072769156?k=20&m=1072769156&s=612x612&w=0&h=k6eFXtE7bpEmR2ns5p3qe_KYh098CVLMz4iKm5OuO6Y='
        );
      }
    });
    return this.dialog.open(UploadDialogComponent, {
      data: {
        name: file.name,
        preview
      }
    });
  }
}
