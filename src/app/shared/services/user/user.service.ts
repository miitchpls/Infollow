import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { POST_Followers, POST_Following, POST_Profile } from '../../constants';
import { Feed } from '../../models/feed.model';
import { FollowersResponseModel } from '../../models/followers-response.model';
import { FollowingResponseModel } from '../../models/following-response.model';
import { Profile } from '../../models/profile.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  public getProfile(username?: string): Observable<Profile> {
    return this.apiService.post(POST_Profile, { username });
  }

  public getFollowing(previousFeed?: Feed): Observable<FollowingResponseModel> {
    return this.apiService.post(POST_Following, {
      feed: previousFeed,
    });
  }

  public getFollowers(previousFeed?: Feed): Observable<FollowersResponseModel> {
    return this.apiService.post(POST_Followers, {
      feed: previousFeed,
    });
  }
}
