import { Feed } from './feed.model';
import { User } from './user.model';

export interface FollowersResponseModel {
  feed: Feed;
  followers: User[];
}
