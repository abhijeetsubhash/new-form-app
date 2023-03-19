import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';

@Injectable()
export class DataService {

  constructor(@Inject(String) private url: string, private http: HttpClient) {}

  getAll() {
    return this.http.get(this.url).pipe(map(response => response),
      catchError(this.handleError)
    );
  }

  create(resource:any) {
    return this.http.post(this.url, JSON.stringify(resource));
  }

  update(resource: any) {
    return this.http.put(this.url + '/' + resource.id, JSON.stringify(resource));
  }

  delete(resource: any) {
    return this.http.delete(this.url + '/' +resource.id).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      console.log(error.status);
      return throwError(() => new AppError());
    }
    if (error.status === 404) {
      console.log(error.status);
      return throwError(() => new NotFoundError());
    }
    return throwError(() => new AppError());
  }
}
