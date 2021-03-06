/*
Crucible
Copyright 2020 Carnegie Mellon University.
NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
Released under a MIT (SEI)-style license, please see license.txt or contact permission@sei.cmu.edu for full terms.
[DISTRIBUTION STATEMENT A] This material has been approved for public release and unlimited distribution.  Please see Copyright notice for non-US Government use and distribution.
Carnegie Mellon� and CERT� are registered in the U.S. Patent and Trademark Office by Carnegie Mellon University.
DM20-0181
*/

import { Component, OnInit } from '@angular/core';
import { VmService } from '../../services/vm/vm.service';
import { interval } from 'rxjs';
import { takeWhile, startWith } from 'rxjs/operators';

declare var WMKS: any; // needed to check values

@Component({
  selector: 'app-wmks',
  templateUrl: './wmks.component.html',
  styleUrls: ['./wmks.component.css']
})

export class WmksComponent implements OnInit {
  public progressMessage = 'Loading ...';
  public isDone = false;

  constructor(public vmService: VmService
  ) { }

  ngOnInit() {

    // This interval will fire every 5 seconds
    interval(5000).pipe(
      startWith(0),
      takeWhile(() => !this.isDone))
      .subscribe(() => this.checkConnected());
  }

  private checkConnected() {
    this.progressMessage = this.progressMessage + '...';
    if (!this.vmService.wmks) {
      if (this.vmService.model.state === '0') {
        this.progressMessage = 'The VM Console API is currently not reachable.';
        this.isDone = true;
      } else if (this.progressMessage.startsWith('The VM API')) {
        this.progressMessage = 'Loading ...';
      }
      this.vmService.connect(this.vmService.model.id);
      console.log('The vm state is ' + this.vmService.model.state);
    } else {
      console.log('Connected');
      this.progressMessage = 'Loading ...';
      const state = this.vmService.wmks.getConnectionState();

      if (state === WMKS.CONST.ConnectionState.DISCONNECTED) {
        this.vmService.connect(this.vmService.model.id);
      }
      this.isDone = true;
    }
  }

}

