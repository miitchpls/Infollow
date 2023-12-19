import { Feed } from './feed.model';
import { User } from './user.model';

export interface FollowingResponseModel {
  feed: Feed;
  following: User[];
}
