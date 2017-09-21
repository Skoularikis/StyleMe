  import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Comment } from "../comment.model";
import { CommentService } from "./comment.service";
import { Image } from "../image.model";
import { ImageService } from "../image.service";
import { GlobalApp } from "../../global";
import { Location } from "@angular/common";
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
    selector: 'app-comment-image',
    templateUrl: './commentimage.component.html',
    styles: [`
        .backdrop {
            background-color: #262626;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
        }

        img {

          height: auto;
width: auto;
max-width: 500px;
max-height: 500px;
        }

        .modal-body {
            max-height: calc(100vh - 210px);
            overflow-y: auto;
        }

        .notgetover {
          margin-top: 2em;
        }



          /***********************
            CUSTON BTN VALUES
          ************************/
          .btn {
            display: inline-block;
            padding: 2px 12px;
            margin-bottom: 0;
            font-size: 11px;

            line-height: 0.5;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            cursor: pointer;
            -webkit-user-select: none;
               -moz-user-select: none;
                -ms-user-select: none;
                    user-select: none;
            background-image: none;
            border: 1px solid transparent;
            border-radius: 3px;
            padding: 10px 16px;
          }

          .btn-lg {
            font-size: 15px;
            line-height: 0.3;
            border-radius: 6px;
          }

          .btn-primary {
            color: #fff;
            background-color: #428bca;
            border-color: #357ebd;
          }

          .btn-primary:hover,
          .btn-primary:focus,
          .btn-primary:active,
          .btn-primary.active,
          .open .dropdown-toggle.btn-primary {
            color: #fff;
            background-color: #3276b1;
            border-color: #285e8e;
          }

          /***********************
            OUTLINE BUTTONS
          ************************/

          .btn.outline {
              background: none;
              padding: 12px 22px;
          }
          .btn-primary.outline {
              border: 2px solid #0099cc;
              color: #0099cc;
          }
          .btn-primary.outline:hover, .btn-primary.outline:focus, .btn-primary.outline:active, .btn-primary.outline.active, .open > .dropdown-toggle.btn-primary {
              color: #33a6cc;
              border-color: #33a6cc;
          }
          .btn-primary.outline:active, .btn-primary.outline.active {
              border-color: #007299;
              color: #007299;
              box-shadow: none;
          }

          /***********************
            CUSTON BTN VALUES
          ************************/

          .btn {
              font-size: 12px;
              border: 0 none;
              font-weight: 700;
              letter-spacing: 1px;
              text-transform: uppercase;
          }
          .btn:focus, .btn:active:focus, .btn.active:focus {
              outline: 0 none;
          }

    `],
    providers: [ GlobalApp ],

})
export class CommentImageComponent implements OnInit {
    image: Image;
    display = 'none';
    comment: Comment;
    commentsImage : Comment[] = [];
    likedbyuser: string[];
    profileimages: Image[] = [];
    id: any;

    constructor(private activatedRoute: ActivatedRoute,
      private commentService: CommentService,
    private imageService: ImageService,
    public globalapp: GlobalApp,
    private router: Router) {}

    onErrorHandled() {


        this.display = 'none';
        this.imageService.changeLike(this.image);
      //  this.image.likedbyuser = this.likedbyuser;

    }

    onSubmit(form: NgForm) {
      if (this.comment) {
        //Edit
        this.comment.content = form.value.content;
        this.commentService.updateComment(this.comment)
            .subscribe(
              result => console.log(result)
        );
        this.comment = null;
      } else {
        //Creating

      const comment = new Comment(form.value.content, 'Kostas', 'Skoul', '1', this.image.userId, this.image.imageId, 0);
      this.commentService.addComment(comment)
          .subscribe(
          result => {
            result => console.log(result)
          },
          error => console.log(error),


    () => {
      this.commentService.getCommentsOfImage(this.image)
    .subscribe(
      (commentsImage: Comment[]) => {
        this.commentsImage = commentsImage,
        console.log(this.commentsImage)
      }
    );
      }
    );
  }
      form.resetForm();
    }



    ngOnInit() {
        this.commentService.imageToggled
            .subscribe(
                (image : Image) => {
                    this.image = image;
                    this.display = 'block';
                    console.log(image.likedbyuser);




                      this.commentService.getCommentsOfImage(this.image)
                          .subscribe(
                      (commentsImage: Comment[]) => {

                        this.commentsImage = commentsImage,
                        console.log(this.commentsImage)


                      }
                    );
                  }

      );

            this.commentService.commentisEdit.subscribe(
              (comment: Comment) => this.comment = comment
            );


    }

    onPutComment(el) {
        el.focus();
    }

    addlike() {

      this.imageService.updateLikes(this.image, localStorage.getItem('userId'))
      .subscribe(
        result => {

          console.log(this.image.likedbyuser)
          this.image.likedbyuser = result.obj.likedbyuser;
          this.image.likes = result.obj.likes
          this.imageService.changeLike(this.image);
          //console.log(this.likedbyuser);
        },
        error => console.error(error.error)

      );
    }
}
