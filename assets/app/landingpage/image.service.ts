import { Injectable, EventEmitter } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Image } from "./image.model";
import { User } from "../auth/user.model";
import { ErrorService } from "../errors/error.service";
//import { CommentService } from "./comments/comment.service";

@Injectable()
export class ImageService {

  private profileimages: Image[] = [];
  private profileimage: Image;
  private profileimageswithdate: Image[] = [];
  public imagesofFriends: Image[] = [];
  likesEdit = new EventEmitter<Image>();
  changeProfileImage = new EventEmitter<Image>();


  constructor(private http: Http, private errorService: ErrorService) {}
/*
  getImage(image: Image) {
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
      return this.http.get('/image/oneimage/' + image.imageId + token)
        .map((response: Response) => {
          this.commentService.toggleImage(response.json())
          response.json();
        })
        .catch((error: Response) => {
          this.errorService.handleError(error.json());
          return Observable.throw(error.json())
        });
  }
*/
  changeLike(image: Image) {
    this.likesEdit.emit(image);
  }

  getProfileImagesWithDate(id: string) {
    //const body = JSON.stringify(idofFriends);
    //console.log(body)
    const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
        return this.http.get('/image/profile/date/' + id  + token)
              .map((response: Response) => {
          const userimages = response.json().obj;
          console.log(userimages)
          let transformedImages: Image[] = [];
          for (let userimage of userimages) {
            transformedImages.push(new Image(userimage.content,
              userimage.user.firstName,
              userimage.user.lastName,
              userimage._id,
              userimage.user._id,
              userimage.likes,
              userimage.desc,
              userimage.likedbyuser,
              userimage.created_at
            ));
          }
          this.profileimageswithdate = transformedImages;
          return transformedImages;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json())
      });
    }

getProfileImages(id: string) {

      const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
      return this.http.get('/image/profile/' + id  + token)
            .map((response: Response) => {
        const userimages = response.json().obj;
        let transformedImages: Image[] = [];
        for (let userimage of userimages) {
          transformedImages.push(new Image(userimage.content,
            userimage.user.firstName,
            userimage.user.lastName,
            userimage._id,
            userimage.user._id,
            userimage.likes,
            userimage.desc,
            userimage.likedbyuser
          ));
        }
        this.profileimages = transformedImages;
        return transformedImages;
    })
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json())
    });
  }



  getProfileImage(userid: string) {


    const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
    return this.http.get('/image/profileimage/' + userid + token)
      .map((response: Response) => {
          const user = response.json().obj;

          if (user.profileimage===null) {
            const profileimage = new Image(null,
            user.firstName,
            user.lastName,
            null,
            user._id,
            0,
            'Put an Image at your profile',
            null,
            null,
            user.status)
            this.profileimage = profileimage;
            return profileimage;
          } else {
          const profileimage = new Image(user.profileimage.content,
            user.firstName,
            user.lastName,
            user.profileimage._id,
            user._id,
            user.profileimage.likes,
            user.profileimage.desc,
            null,
            null,
            user.status);
          this.profileimage = profileimage;
          return profileimage;
        }
        })
        .catch((error: Response) => {
          this.errorService.handleError(error.json());
          return Observable.throw(error.json())
        });

  }


  addImage(image: Image) {
    const body = JSON.stringify(image);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
    return this.http.post('/image' + token, body, {headers: headers})
              .map((response: Response) => {
                const result = response.json();

                const image = new Image(result.obj.content,
                      result.obj.user.firstName,
                      result.obj.user.lastName,
                      result.obj._id,
                      result.obj.user._id,
                      result.obj.likes,
                      result.obj.desc);
                this.profileimages.push(image);
                return image;
              })
              .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
              });
  }

  updateProfileImage(image: Image) {
    const body = JSON.stringify(image);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
    return this.http.patch('/image/' + image.imageId + token, body, {headers: headers})
      .map((response: Response) => {
        const user = response.json().obj;
        const newprofileimage = new Image(null,
        user.firstName,
        user.lastName,
        user.profileimage,
        user._id,
        )
        this.profileimage = newprofileimage;
        this.changeProfileImage.emit(this.profileimage)
        return newprofileimage;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  deleteImage(image: Image) {
    this.profileimages.splice(this.profileimages.indexOf(image), 1);
    const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
    return this.http.delete('/image/' + image.imageId + token)
      .map((response: Response) => {
        const image = response.json().obj;
        if (image._id == this.profileimage.imageId) {
          const newprofileimage = new Image(null,
          image.user.firstName,
          image.user.lastName,
          null,
          image.user._id,
          0,
          'Put an Image at your profile',
          null,
          null,
          image.user.status)
          this.profileimage = newprofileimage;
          this.changeProfileImage.emit(this.profileimage)
          return newprofileimage;
        } else {
          const newprofileimage = new Image(null,
          image.user.firstName,
          image.user.lastName,
          null,
          image.user._id,
          0,
          'Put an Image at your profile',
          null,
          null,
          image.user.status)
          return newprofileimage;
        }
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json())
      });
  }

  updateLikes(image: Image, id: string) {
  const body = JSON.stringify(image);
  const headers = new Headers({'Content-Type': 'application/json'});
  const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
  return this.http.patch('/image/' + id + '/likes/' + image.imageId  + token, body, {headers: headers})
    .map((response: Response) => response.json())
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json())
    });
  }

  getImageAfterLike(image: Image) {
          console.log(image)
    const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
    return this.http.get('/image/golike/' + image.imageId + token)
      .map((response: Response) => {
          const image = response.json().obj;
          console.log(image)
          const profileimage = new Image(image.content,
            image.user.firstName,
            image.user.lastName,
            image._id,
            image.user._id,
            image.likes,
            image.desc,
            image.likedbyuser,
            image.created_at,
            image.status);
          this.profileimage = profileimage;
          return profileimage;

        })
        .catch((error: Response) => {
          this.errorService.handleError(error.json());
          return Observable.throw(error.json())
        });
  }

}
