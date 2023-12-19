import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, expand, reduce } from 'rxjs';
import { Feed } from 'src/app/shared/models/feed.model';
import { FollowersResponseModel } from 'src/app/shared/models/followers-response.model';
import { FollowingResponseModel } from 'src/app/shared/models/following-response.model';
import { Profile } from 'src/app/shared/models/profile.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'homepage-page',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  public profile: Profile;
  private following: User[] = [];
  private followers: User[] = [];
  public notFollowingBack: User[];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getProfile();
    this.following = await this.loadFollowing();
    this.followers = await this.loadFollowers();

    this.compareFollowingFollowers();
  }

  private getProfile(): Promise<void> {
    return new Promise((resolve) => {
      this.userService.getProfile().subscribe({
        next: (profile: Profile) => {
          this.profile = profile;
          resolve();
        },
        error: () => {
          this.authService.deleteToken();
          this.router.navigate(['/login']);
          this.toastr.error(this.translate.instant('session_expired'));
        },
      });
    });
  }

  private loadFollowing(): Promise<User[]> {
    return new Promise((resolve) => {
      this.getAllFollowing().subscribe((data) => resolve(data));
    });
  }

  private getAllFollowing(): Observable<User[]> {
    return this.getFollowing().pipe(
      expand((data) =>
        data.feed?.moreAvailable === true ? this.getFollowing(data.feed) : EMPTY
      ),
      reduce((acc: User[], val: FollowingResponseModel) => {
        acc = [...acc, ...val.following];
        return acc;
      }, [])
    );
  }

  private getFollowing(
    previousFeed?: Feed
  ): Observable<FollowingResponseModel> {
    return this.userService.getFollowing(previousFeed);
  }

  private loadFollowers(): Promise<User[]> {
    return new Promise((resolve) => {
      this.getAllFollowers().subscribe((data) => resolve(data));
    });
  }

  private getAllFollowers(): Observable<User[]> {
    return this.getFollowers().pipe(
      expand((data) =>
        data.feed?.moreAvailable === true ? this.getFollowers(data.feed) : EMPTY
      ),
      reduce((acc: User[], val: FollowersResponseModel) => {
        acc = [...acc, ...val.followers];
        return acc;
      }, [])
    );
  }

  private getFollowers(
    previousFeed?: Feed
  ): Observable<FollowersResponseModel> {
    return this.userService.getFollowers(previousFeed);
  }
  private compareFollowingFollowers(): void {
    this.notFollowingBack = this.following.filter(
      (follow) =>
        !this.followers
          .map((follower) => follower.username)
          .includes(follow.username)
    );
  }
}
