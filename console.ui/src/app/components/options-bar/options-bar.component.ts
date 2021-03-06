/*
Crucible
Copyright 2020 Carnegie Mellon University.
NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
Released under a MIT (SEI)-style license, please see license.txt or contact permission@sei.cmu.edu for full terms.
[DISTRIBUTION STATEMENT A] This material has been approved for public release and unlimited distribution.  Please see Copyright notice for non-US Government use and distribution.
Carnegie Mellon� and CERT� are registered in the U.S. Patent and Trademark Office by Carnegie Mellon University.
DM20-0181
*/

import { Component, OnInit,  Pipe, PipeTransform, Input } from '@angular/core';
import { VmService } from '../../services/vm/vm.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../services/notification/notification.service';
import { NotificationData } from '../../models/notification/notification-model';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { VmModel } from '../../models/vm/vm-model';

declare var WMKS: any; // needed to check values
const MAX_COPY_RETRIES = 1;

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    const keys = [];
    for (const key of Object.keys(value)) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}
@Component({
  selector: 'app-options-bar',
  templateUrl: './options-bar.component.html',
  styleUrls: ['./options-bar.component.css']
})

export class OptionsBarComponent implements OnInit {
  public opened = false;

  // we could check permissions in api and set this value
  public powerOptions = true;
  public vmToolsAvailable = false;
  public uploadEnabled = false;
  public uploading = false;
  public retrievingIsos = false;
  public publicIsos: any;
  public teamIsos: any;
  public vmSettingsButtonLabel = 'Enter VM Credentials';
  public tasksInProgress: NotificationData[] = [];
  public inFrame: boolean;
  public clipBoardText: string;

  private copyRetryCount: number;

  constructor(
    public vmService: VmService,
    private dialogService: DialogService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {  }

  ngOnInit() {
    this.clipBoardText = '';
    this.copyRetryCount = 0;

    this.vmService.modelSubject.subscribe(model => {
      this.vmToolsAvailable = model.vmToolsAvailable;
    });
    this.notificationService.tasksInProgress.subscribe(data => {
      if (!!data && data.length > 0) {
        this.tasksInProgress = <Array<NotificationData>>data;
      }
    });
    this.notificationService.connectToProgressHub(this.vmService.model.id, this.authService.getAuthorizationToken());

    this.inFrame = this.inIframe();

    this.vmService.vmClipBoard.subscribe(data => {
      if (data !== '') {
        this.copyRetryCount = 0;
        this.clipBoardText = data;
        this.writeToClipboard(this.clipBoardText);
      }
    });

  }

  inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
  }

  openInTab() {
    window.open(window.location.href);
  }

  fullscreen() {
    if (this.vmService.wmks.isFullScreen()) {
        // console.log('browser is fullscreen');
    } else if (this.vmService.wmks.canFullScreen()) {
        // console.log('attempting fullscreen');
        this.vmService.wmks.enterFullScreen();
    } else {
        console.log('cannot do fullscreen');
    }
  }

  changeNic(adapter, nic) {
    this.vmService.changeNic(this.vmService.model.id, adapter, nic).subscribe(
     (model: VmModel) => {
        this.vmService.model = model;
      });
  }

  cad() {
    console.log('sending CAD');
    this.vmService.wmks.sendCAD();
  }

  enableCopyPaste() {
    const data = 'enable copy paste at ' + Date.now().toString();
    const event = (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', data);
      e.preventDefault();
      document.removeEventListener('copy', event);
    };
    document.addEventListener('copy', event);
    document.execCommand('copy');
    console.log('enabled copy paste');
  }

  sendInputString() {
    if (!this.vmToolsAvailable) {
      this.dialogService.message('Alert!', 'Action requires VMware Tools to be running!');
      return;
    }
    this.dialogService.sendText('Enter Text to Send').subscribe(enteredText => {
        if (enteredText) {
          this.vmService.wmks.sendInputString(enteredText);
        }
    });
  }

  disconnect() {
    console.log('disconnect requested');
    this.vmService.wmks.disconnect();
  }

  reconnect() {
    console.log('reconnect requested');
    this.disconnect();
    this.connect();
  }

  connect() {
    console.log('connect requested');
    this.vmService.connect(this.vmService.model.id);
  }

  poweron() {
    console.log('poweron requested');
    this.vmService.powerOn(this.vmService.model.id);
  }

  poweroff() {
    console.log('poweroff requested');
    this.vmService.powerOff(this.vmService.model.id);
  }

  reboot() {
    console.log('reboot requested');
    this.vmService.reBoot(this.vmService.model.id);
  }

  enableFileUpload(title) {
    this.vmService.uploadConfig.username = '';
    this.vmService.uploadConfig.password = '';
    this.vmService.uploadConfig.filepath = '';
    if (!this.vmToolsAvailable) {
      this.dialogService.message('Alert!', 'Action requires VMware Tools to be running!');
      this.uploadEnabled = false;
      return;
    }
    // get new credentials and upload path
    this.dialogService.getFileUploadInfo(title).subscribe(enteredInfo => {
      if (!enteredInfo['username']) {
        return;
      }
      this.vmService.uploadConfig.username = enteredInfo['username'];
      this.vmService.uploadConfig.password = enteredInfo['password'];
      this.vmService.uploadConfig.filepath = enteredInfo['filepath'];
      if (!this.vmService.uploadConfig.filepath.endsWith('\\') && !this.vmService.uploadConfig.filepath.endsWith('/')) {
        if (this.vmService.uploadConfig.filepath.includes('\\')) {
          this.vmService.uploadConfig.filepath += '\\';
        } else if (this.vmService.uploadConfig.filepath.includes('/')) {
          this.vmService.uploadConfig.filepath += '/';
        } else {
          this.enableFileUpload('The file path must be an absolute path.');
          return;
        }
      }
      this.vmService.verifyCredentials(this.vmService.model.id).subscribe(
        response => {
          this.uploadEnabled = true;
          this.vmSettingsButtonLabel = 'Change VM Credentials';
        },
        error => {
          this.uploadEnabled = false;
          if (error.error.includes('credentials')) {
            this.enableFileUpload('Bad Credentials.  Please try again.');
          } else if (error.error.includes('parameter')) {
            this.enableFileUpload('The entered path was not valid.');
          } else {
            this.enableFileUpload('Unhandled error. Please try again.');
          }
        }
      );
    });
  }

  uploadFileToVm(fileSelector) {
    if (fileSelector.value === '') {
      console.log('file selector did not have a value');
      return;
    }
    this.uploading = true;
    this.vmService.sendFileToVm(this.vmService.model.id, fileSelector.files).subscribe(
      response => {
        fileSelector.value = '';
        this.uploading = false;
        console.log(response);
      },
      error => {
        fileSelector.value = '';
        this.uploading = false;
        console.log(error);
      }
    );
  }

  startIsoMount() {
    // refresh the iso list
    this.retrievingIsos = true;
    this.vmService.getIsos().subscribe(
      response => {
        this.splitIsoList(response);
        this.retrievingIsos = false;
        this.mountIso();
      },
      error => {
        console.log(error);
        this.publicIsos = [];
        this.teamIsos = [];
        this.retrievingIsos = false;
      }
    );
  }

  mountIso() {
    // select the iso
    const configData = {
      'width': '500px',
      'height': '540px'
    };
    this.dialogService.mountIso(this.publicIsos, this.teamIsos, configData).subscribe(result => {
      if (!result['path']) {
        return;
      }
      // mount the iso
      this.vmService.mountIso(this.vmService.model.id, result['path']).subscribe(
        // refresh the vm model
        (model: VmModel) => {
          this.vmService.model = model;
        });
    });
  }

  splitIsoList(isoList: any) {
    const exerciseId = this.route.snapshot.queryParams['exerciseId'];
    this.teamIsos = [];
    this.publicIsos = [];
    isoList.forEach(isoName => {
      const start = isoName.lastIndexOf('/') + 1;
      const filename = isoName.substring(start);
      const isoObject = {
        'filename': filename,
        'path': isoName
      };
      if (isoName.indexOf('/' + exerciseId + '/' + exerciseId + '/') > -1) {
        this.publicIsos.push(isoObject);
      } else {
        this.teamIsos.push(isoObject);
      }
    });
  }

  async writeToClipboard(clipText: string) {
    try {
      await navigator.clipboard.writeText(clipText);
      this.snackBar.open('Copied Virtual Machine Clipboard', 'Ok', {
        duration: 2000,
        verticalPosition: 'top'
      });
    } catch (err) {
      this.dialogService.message('Select text and press Ctrl+C to copy to your local clipboard:', clipText);
      console.log('Problem');
    }
  }


  async pasteFromClipboard() {
    try {
      const clip = await navigator.clipboard.readText();
      this.vmService.wmks.sendInputString(clip);
    } catch (err) {
      // If an error occur trying to read the local clipboard, simply open the input menu.
      this.sendInputString();
    }
  }

  copyVmClipboard() {
    this.copyRetryCount++;
    console.log('Trying to copy.  Count:  ', this.copyRetryCount);
    this.vmService.wmks.grab();
    setTimeout(() => {
      if (this.copyRetryCount > MAX_COPY_RETRIES) {
        this.snackBar.open('Copy from VM failed!  Contact an Administrator to verify the the Virtual machine is configured properly.',
        'Close',
        {
          duration: 10000,
          verticalPosition: 'top'
        });
        this.copyRetryCount = 0;
      } else if (this.copyRetryCount > 0 && this.copyRetryCount <= MAX_COPY_RETRIES) {
        console.log('Retry of copy');
        this.copyVmClipboard();
      }
    }, 2000);
  }
}

