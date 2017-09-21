import { Component, Input} from "@angular/core";

import { Image } from "../image.model";


import { OrderByPipe } from './orderby.pipe';
import { Friend } from "../friend.model";

@Component({
  selector: 'app-image',
  template: `



  <div class="thumbnail">

  <h4 class="in"><strong> {{profileimg?.firstName}} {{profileimg?.lastName}} 	&nbsp;  </strong>  </h4>
  <h5 class="in" [ngStyle]="{'font-style': 'italic', 'text-align': 'left', 'font-size': '13px'}">    posted at {{profileimg?.created_at | date: 'MM/dd'}} </h5>
  <img [attr.src]="profileimg.content" class="portrait"  alt="Image" >
    <h4 [ngStyle]="{'margin-left':'5px', 'color':'none'}"> {{profileimg?.desc}} </h4>
    <app-likecomment [profileimg] = "profileimg"></app-likecomment>
  </div>



  `,
  styles: [`
    #asd {
      max-width: 450px;
      height: auto;

    }


    h4,h5  {

      color: #3399ff;
    }
    .in {
      display: inline-block;
    }
    `]

})

export class ImageComponent {

  @Input() profileimg: Image;






}
