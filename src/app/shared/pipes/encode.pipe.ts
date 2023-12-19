import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { POST_Encode } from '../constants';
import { ApiService } from '../services/api/api.service';

@Pipe({
  name: 'encode',
})
export class EncodePipe implements PipeTransform {
  constructor(
    private apiService: ApiService,
    private translate: TranslateService
  ) {}

  private encodeError() {
    return throwError(
      () => new Error(this.translate.instant('encoding_error'))
    );
  }

  transform(value: string, video = false): Observable<any> {
    return this.apiService
      .post(POST_Encode, { url: value, video: video })
      .pipe(catchError(this.encodeError))
      .pipe(
        map((data: string) => {
          return data;
        })
      );
  }
}
