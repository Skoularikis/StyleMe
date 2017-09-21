import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { ProfileComponent } from "./profile/profile.component";
import { ProfessionalComponent } from "./stackoverflowlike/professional.component";
import { SimpleUserTabComponent } from "./socialapp/simpleusertab.component";
import { ThumbNailComponent } from "./socialapp/thumbnail.component";
import { landing_routing } from "./landingpage.routing";

import { ImageService } from "./image.service";
import { AddFileComponent } from "./socialapp/addfile.component";
import { ImageComponent } from "./socialapp/image.component";
import { FriendsService } from "./friend.service";
import { FriendsComponent } from "./profile/friends.component";
import { UserImagesComponent } from "./profile/userimages.component";
import { UserImageComponent } from "./profile/userimage.component";
import { FriendComponent } from "./profile/friend.component";
import { DropdownModule} from "ngx-dropdown";
import { ThumbNailsComponent } from "./socialapp/thumbnails.component";
import { LikeComment } from "./socialapp/likecomment.component";
import { OrderByPipe } from "./socialapp/orderby.pipe";
import { FriendReqComponent } from "./profile/friendreq.component";
import { FriendUrReqComponent } from "./profile/friendurreq.component";
import { CommentService } from "./comments/comment.service";
import { CommentImageComponent } from "./comments/commentimage.component";
import { SingleComment } from "./comments/singlecomment.component";
import { ProService } from "./pro.service";
import { AfterSearchComponent } from "./stackoverflowlike/aftersearch.component";
import { UserSortedByRatingComponent } from "./stackoverflowlike/usersortedbyrating.component";
import { ProSearchComponent } from "./stackoverflowlike/prosearch.component";
import { HireComponent } from "./stackoverflowlike/hire.component";
import { JobDescComponent } from "./profile/jobdesc.component";
import { UsersAfterSearchComponent } from "./stackoverflowlike/usersaftersearch.component";
import { AcceptedFriendsComponent } from "./profile/acceptedfriend.component";


@NgModule({
    declarations: [
        ProfileComponent,
        ProfessionalComponent,
        SimpleUserTabComponent,
        ThumbNailsComponent,
        AddFileComponent,
        UserImagesComponent,
        FriendsComponent,
        UserImageComponent,
        FriendComponent,
        ThumbNailComponent,
        LikeComment,
        ImageComponent,
        OrderByPipe,
        FriendUrReqComponent,
        FriendReqComponent,
        CommentImageComponent,
        SingleComment,
        UserSortedByRatingComponent,
        ProSearchComponent,
        HireComponent,
        JobDescComponent,
        AfterSearchComponent,
        UsersAfterSearchComponent,
        AcceptedFriendsComponent

    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        landing_routing,
        DropdownModule,


    ],
    providers: [ImageService, FriendsService, CommentService, ProService]
})
export class LandingPageModule {

}
