import { Component, Input, OnInit } from '@angular/core';

import { Friend } from "../friend.model";

@Component({
  selector: 'app-user-friend',
  templateUrl: './friend.component.html'


})

export class FriendComponent implements OnInit {
  @Input() friends: Friend[];



  ngOnInit() {
    console.log(this.friends);
  }

}
