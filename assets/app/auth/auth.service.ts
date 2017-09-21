import { Injectable, EventEmitter } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "./user.model";
import { ErrorService } from '../errors/error.service';



@Injectable()
export class AuthService {
    public id: string = ''
    activatefirstRoute = new EventEmitter<string>();
    constructor(private http: Http,
    private errorService: ErrorService) {}

    signup(user: User) {
      const body = JSON.stringify(user);
      const headers = new Headers({'Content-Type':'application/json'});
      return this.http.post('/user', body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => {
          this.errorService.handleError(error.json());
          return Observable.throw(error.json())
        });
    }

    logout() {
      localStorage.clear();
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('/user/signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
              this.errorService.handleError(error.json());
              return Observable.throw(error.json())
            });
    }

    isLoggedIn() {
      return localStorage.getItem('token') !== null;
    }

    isActive(activated: string) {
      this.activatefirstRoute.emit(activated);
    }

    signuppro(user: User) {
      const body = JSON.stringify(user);
      const headers = new Headers({'Content-Type':'application/json'});
      return this.http.post('/user/pro', body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => {
          this.errorService.handleError(error.json());
          return Observable.throw(error.json())
        });
    }
}
