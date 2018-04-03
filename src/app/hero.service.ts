import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';
import {
         HttpClient,
         HttpHeaders,
         HttpParams,
         HttpErrorResponse
                            } from '@angular/common/http';
import { Hero }               from './hero';
import { MessageService } from './message.service';
import { catchError} from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class HeroService {
  heroesUrl = 'api/heroes';

constructor (private http: HttpClient){ }

private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
    } else {
        console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
      return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

getHeroes (): Observable<Hero[]> {
  return this.http.get<Hero[]>(this.heroesUrl)
  .pipe(
     catchError(this.handleError)
   );
}

searchHeroes(term: string): Observable<Hero[]> {
    term = term.trim();

    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Hero[]>(this.heroesUrl, options)
      .pipe(
        catchError(this.handleError)
    );
  }

addHero(hero:Hero):Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
}

getHero(_id: string): Observable<Hero> {
  const url = `${this.heroesUrl}/${_id}`;
  return this.http.get<Hero>(url)
    .pipe(
      catchError(this.handleError)
  );
}

deleteHero (_id:string): Observable<{}> {
  const url = `${this.heroesUrl}/${_id}`;
  return this.http.delete(url, httpOptions)
      .pipe(
          catchError(this.handleError)
      );
}

updateHero (hero: Hero): Observable<Hero> {
  httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
    const url = `${this.heroesUrl}/${hero._id}`
      return this.http.put<Hero>(url, hero,httpOptions)
        .pipe(
          catchError(this.handleError)
   );

 }

}
