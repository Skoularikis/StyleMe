import { Component, OnInit, EventEmitter } from '@angular/core';

import { Location } from '@angular/common'
import { ProService} from "../pro.service";
import { User } from "../../auth/user.model";




@Component({
  selector: 'app-pro',
  templateUrl: './professional.component.html',
  styles: [`

    .notgetover {
      margin-top: 3em;
    }
    .notgetclose {
      margin-top: 3em;
    }

`]
})

export class ProfessionalComponent implements OnInit {

  prousers: User[] = [];


  constructor(private proService: ProService) {
  }


  ngOnInit() {
    this.proService.getProUsersWithRating()
    .subscribe(
      (proUsers: User[]) => {
        this.prousers=proUsers
        console.log(this.prousers)
        console.log(proUsers)
      }
    );

  }
}
