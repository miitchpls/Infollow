export interface Profile {
  username: string;
  full_name: string;
  hd_profile_pic_url_info: HdProfilePicUrlInfo;
  follower_count: number;
  following_count: number;
  biography: string;
  external_url: string;
}

export interface HdProfilePicUrlInfo {
  url: string;
  width: number;
  height: number;
}
