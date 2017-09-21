import { Injectable, EventEmitter } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Image } from "./image.model";
import { User } from "../auth/user.model";
import { Friend } from "./friend.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class FriendsService {
  private friends: Friend[] = [];
  private friend: Friend;
  private idfriend: string = localStorage.getItem('userId');
  private friendFromOtherUser: Friend;
  private reqfriends: Friend[] = [];
  private urreqfriends: Friend[] = [];
  private possiblefriends: User[] = [];
  user: User;
  constructor(private http: Http,   private errorService: ErrorService) {}

  search(term: string): Observable<User[]> {
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http
      .get(`/friend/?fullName=${term}`)
      .map((response: Response) => response.json().data as User[])
/*
      {
        const users = response.json().data as User[];
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
          this.possiblefriends = transformedUsers;
          return transformedUsers;

        }
      })
      */
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json())
      });
  }

/*  getUserId(user: User) {
    const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
    return this.http.get('/user/' + + token)
      .map((response: Response) => {
          const user = response.json().obj;
  }
*/
getUser(id:string) {

  const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
  return this.http.get('/friend/user/' + id  + token)
        .map((response: Response) => {
    const user = response.json().obj;
    console.log(user)
    const prouser = new User(user.email,
      null,
      user.firstName,
      user.lastName,
      user.jobdesc,
      null,
      user._id,
      user.fewWords,
      user.friends
    );
    this.user = prouser;
    return prouser;
  })
.catch((error: Response) => {
  this.errorService.handleError(error.json());
  return Observable.throw(error.json())
});
}


getFriends(id: string) {

  const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
  return this.http.get('/friend/friends/' + id  + token)
        .map((response: Response) => {
    const results = response.json().obj;

    let transformedFriends: Friend[] = [];

    for (let result of results.friends) {

      transformedFriends.push(new Friend(result.firstName,
      result.lastName,
      result.fullName,
      result.status,
      result.statususer,
      result.friend,
      result.user,
      result.created_at,
      result._id));


  }

  this.friends = transformedFriends;

  return transformedFriends;

})
.catch((error: Response) => {
  this.errorService.handleError(error.json());
  return Observable.throw(error.json())
});
}

getAllFriends(id: string) {

  const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
  return this.http.get('/friend/friends/' + id  + token)
        .map((response: Response) => response.json())
        .catch((error: Response) => {
  this.errorService.handleError(error.json());
  return Observable.throw(error.json())
  });
}




addFriend(id: string) {
  console.log(id)
  const headers = new Headers({'Content-Type': 'application/json'});

  const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
  return this.http.post('/friend/add/' + id + token, {headers: headers})
    .map((response: Response) => {
      const result = response.json();
      const friend = new Friend(result.obj.firstName,
      result.obj.lastName,
      result.obj.fullName,
      result.obj.status,
      result.obj.statususer,
      result.obj.friend,
      result.obj.user,
      result.obj.created_at,
      result.obj._id);

    this.friends.push(friend);
    return friend;

    })
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json())
    });
}

getFriend(id: string) {
  const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
  return this.http.get('/friend/' + id + token)
    .map((response: Response) => {
        const result = response.json().obj;
        console.log(result)
        if (result===null) {
          const friend = new Friend(
            'null',
            'null',
            'null',
            'null',
            'null',
            'null',
            'null',
             null,
            'null'

          );
          this.friend = friend;
          return friend;
        } else {
        const friend = new Friend(result.firstName,
        result.lastName,
        result.fullName,
        result.status,
        result.statususer,
        result.friend,
        result.user,
        result.created_at,
        result._id);
        this.friend = friend;

        return friend;
      }
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json())
      });
}


getFriendFromOtherUser(id: string) {
  const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
  return this.http.get('/friend/other/' + id + token)
    .map((response: Response) => {
        const result = response.json().obj;
        console.log(result)
        if (result===null) {
          const friendFromOtherUser = new Friend(
            'null',
            'null',
            'null',
            'null',
            'null',
            'null',
            'null',
             null,
            'null'

          );
          this.friendFromOtherUser = friendFromOtherUser;
          return friendFromOtherUser;
        } else {
        const friendFromOtherUser = new Friend(result.firstName,
        result.lastName,
        result.fullName,
        result.status,
        result.statususer,
        result.friend,
        result.user,
        result.created_at,
        result._id);
        this.friendFromOtherUser = friendFromOtherUser;
        return friendFromOtherUser;
      }
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json())
      });
}
/*
getFriendReq(friend: Friend) {
  const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
  return this.http.get('/friend/requested/' + friend.friendIdBack + token)
    .map((response: Response) => {
        const result = response.json().obj;
        console.log(result)
        if (result===null) {
          const friendFromOtherUser = new Friend(
            'null',
            'null',
            'null',
            'null',
            'null',
            'null',
            'null',
             null,
            'null'

          );
          this.friend = friendFromOtherUser;
          return friendFromOtherUser;
        } else {
        const friendFromOtherUser = new Friend(result.firstName,
        result.lastName,
        result.fullName,
        result.status,
        result.statususer,
        result.friend,
        result.user,
        result.created_at,
        result._id);
        this.friend = friendFromOtherUser;
        return friendFromOtherUser;
      }
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json())
      });
}
*/


acceptFriend(friend: Friend) {
  const body = JSON.stringify(friend);
  const headers = new Headers({'Content-Type': 'application/json'});
  const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
  return this.http.patch('/friend/accept/' + friend.friendIdBack + token, {headers: headers})
    .map((response: Response) => response.json())
    .catch((error: Response) => Observable.throw(error.json()));
}

deleteUserFromFriends(friend: Friend) {
  this.friends.splice(this.friends.indexOf(friend), 1);
  const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
  return this.http.delete('/friend/' + friend.friendIdBack + token)
    .map((response: Response) => response.json())
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json())
    });
}


/*  getReqFriends(id: string) {
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.get('/friend/friends/req/' + id  + token)
          .map((response: Response) => {
      const results = response.json().obj;
      console.log(results)
      let transformedFriends: Friend[] = [];

      for (let result of results.friends) {
        transformedFriends.push(new Friend(result.firstName,
        result.lastName,
        result.fullName,
        result.status,
        result.statususer,
        result.friend,
        result.user,
        result.created_at,
        result._id));
      }
      this.friends = transformedFriends;
      return transformedFriends;
  })
  .catch((error: Response) => {
    this.errorService.handleError(error.json());
    return Observable.throw(error.json())
  });
}*/


 }
