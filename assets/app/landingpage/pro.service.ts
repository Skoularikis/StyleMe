import { Injectable, EventEmitter } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";


import { User } from "../auth/user.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class ProService {

    proUsers: User[] = [];
    proUser: User;
    constructor(private http: Http, private errorService: ErrorService) {}

    getProUsersWithRating() {
      const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
      return this.http.get('/user/rating/' + token)
            .map((response: Response) => {
        const userssorted = response.json().obj;
        console.log(response.json().obj)
        let transformedUser: User[] = [];
        for (let prouser of userssorted) {
          transformedUser.push(new User(prouser.email,
            null,
            prouser.firstName,
            prouser.lastName,
            prouser.jobdesc,
            null,
            prouser._id,
            prouser.fewWords,
          ));
        }
        this.proUsers = transformedUser;
        return transformedUser;
    })
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json())
    });
    }

    search(term: string): Observable<User[]> {
      const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
      return this.http
        .get(`/user/?jobdesc=${term}`)
        .map((response: Response) => response.json().data as User[])
/*
        {
          const users = response.json().data;
          let transformedUsers: User[] = [];
          for (let user of users) {
            transformedUsers.push(new User(user.email,
              null,
              user.firstName,
              user.lastName,
              user.jobdesc,
              null,
              user._id,
              user.fewWords
            ));
            this.proUsers = transformedUsers;
            return transformedUsers;
          }
        })
        */
        .catch((error: Response) => {
          this.errorService.handleError(error.json());
          return Observable.throw(error.json())
        });
    }

    getHireUser(id: string) {
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.get('/user/' + id + token)
        .map((response: Response) => {
            const user = response.json().obj;
            const prouser = new User(user.email,
              null,
              user.firstName,
              user.lastName,
              user.jobdesc,
              null,
              user._id,
              user.fewWords
            );
            this.proUser = prouser;
            return prouser;

          })
          .catch((error: Response) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json())
          });

    }
    updatefewWords(user: User) {
      const body = JSON.stringify(user);
      const headers = new Headers({'Content-Type': 'application/json'});
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.patch('/user/' + user._id + token, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    }

    getUsersbyJobDesc(job: string) {
      const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
      return this.http.get('/user/job/' + job + token)
            .map((response: Response) => {
        const userssorted = response.json().obj;
        console.log(response.json().obj)
        let transformedUser: User[] = [];
        for (let prouser of userssorted) {
          transformedUser.push(new User(prouser.email,
            null,
            prouser.firstName,
            prouser.lastName,
            prouser.jobdesc,
            null,
            prouser._id,
            prouser.fewWords,
          ));
        }
        this.proUsers = transformedUser;
        return transformedUser;
      })
      .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json())
      });
      }


}
