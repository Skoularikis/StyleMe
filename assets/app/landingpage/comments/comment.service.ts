import { Injectable, EventEmitter } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Image } from "../image.model";
import { ErrorService } from "../../errors/error.service";
import { Friend } from "../friend.model";
import { Comment } from "../comment.model";

@Injectable()
export class CommentService {

    imageToggled = new EventEmitter<Image>();
    commentisEdit = new EventEmitter<Comment>();
    commentsImage : Comment[] = [];

    constructor(private http: Http,   private errorService: ErrorService) {}

    toggleImage(image: any) {
      const imageData = new Image(
        image.content,
        image.firstName,
        image.lastName,
        image.imageId,
        image.userId,
        image.likes,
        image.desc,
        image.likedbyuser,
        image.created_at
      );
      console.log(imageData);
      this.imageToggled.emit(imageData);
      console.log(this.imageToggled);
    }

  getCommentsOfImage(image: Image) {
      const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.get('/comment/' + image.imageId  + token)
                  .map((response: Response) => {
                    const comments = response.json().obj;
                    console.log(comments);
                    let transformComments : Comment[] = [];
                    for (let comment of comments) {
                      transformComments.push(new Comment(
                        comment.content,
                        comment.user.firstName,
                        comment.user.lastName,
                        comment._id,
                        comment.user._id,
                        comment.image,
                        comment.likes,
                        comment.likedbyuser,
                        comment.user.status

                      ));
                    }
                    this.commentsImage = transformComments;
                    return transformComments;
                  })
                  .catch((error: Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json())
                  });
    }


    addComment(comment: Comment) {
      const body = JSON.stringify(comment);
      console.log(body);
      const headers = new Headers({'Content-Type' : 'application/json'});
      const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
      return this.http.post('/comment' + token, body, {headers: headers})
            .map((response: Response) => {
              const result = response.json();

              const comm = new Comment(result.obj.content,
                    result.obj.user.firstName,
                    result.obj.user.lastName,
                    result.obj._id,
                    result.obj.user._id,
                    result.obj.image._id,
                    result.obj.likes,
                    result.obj.likedbyuser);

              this.commentsImage.push(comm);
              return comm;
            })
           .catch((error: Response) => Observable.throw(error.json()));
    }

    editComment(comment: Comment) {
      this.commentisEdit.emit(comment);
    }

    updateComment(comment: Comment) {
      const body = JSON.stringify(comment);
      const headers = new Headers({'Content-Type': 'application/json'});
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.patch('/comment/' + comment.commentId + token, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteComment(comment: Comment) {
      this.commentsImage.splice(this.commentsImage.indexOf(comment), 1);
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.delete('/comment/' + comment.commentId + token)
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    }

    updateCommentLikes(comment: Comment, id: string) {
    const body = JSON.stringify(comment);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
    return this.http.patch('/comment/' + id + '/likes/' + comment.commentId  + token, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json())
      });
    }

}
