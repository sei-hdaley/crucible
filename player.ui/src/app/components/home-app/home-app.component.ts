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
import { AuthService } from '../../services/auth/auth.service';
import { SettingsService } from '../../services/settings/settings.service';
import { Title } from '@angular/platform-browser';
import { LoggedInUserService } from '../../services/logged-in-user/logged-in-user.service';

@Component({
  selector: 'app-home-app',
  templateUrl: './home-app.component.html',
  providers: [AuthService],
  styleUrls: ['./home-app.component.css']
})
export class HomeAppComponent implements OnInit {

  public username: string;
  public titleText: string;
  public isSuperUser: Boolean;
  public topBarColor = '#b00';

  constructor(
    private authService: AuthService,
    private settingsService: SettingsService,
    private titleService: Title,
    private usersService: LoggedInUserService
  ) { }

  ngOnInit() {
    // Set the topbar color from config file
    this.topBarColor = this.settingsService.AppTopBarHexColor;

    // Set the page title from configuration file
    this.titleText = this.settingsService.AppTopBarText;
    this.titleService.setTitle(this.settingsService.AppTitle);
    this.username = '';
    this.isSuperUser = false;

    this.usersService.loggedInUser.subscribe(loggedInUser => {

      if (loggedInUser == null) {
        return;
      }
      // Get username information
      this.username = loggedInUser.name;

    });

    this.usersService.isSuperUser.subscribe(isSuperUser => {
      this.isSuperUser = isSuperUser;
    });

  }

  logout(): void {
    this.authService.logout();
  }

}

