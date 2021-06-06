import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators'

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

export interface IFilm {
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public messages: Message[] = [
    {
      fromName: 'Matt Chorsey',
      subject: 'New event: Trip to Vegas',
      date: '9:32 AM',
      id: 0,
      read: false
    },
    {
      fromName: 'Lauren Ruthford',
      subject: 'Long time no chat',
      date: '6:12 AM',
      id: 1,
      read: false
    },
    {
      fromName: 'Jordan Firth',
      subject: 'Report Results',
      date: '4:55 AM',
      id: 2,
      read: false
    },
    {
      fromName: 'Bill Thomas',
      subject: 'The situation',
      date: 'Yesterday',
      id: 3,
      read: false
    },
    {
      fromName: 'Joanne Pollan',
      subject: 'Updated invitation: Swim lessons',
      date: 'Yesterday',
      id: 4,
      read: false
    },
    {
      fromName: 'Andrea Cornerston',
      subject: 'Last minute ask',
      date: 'Yesterday',
      id: 5,
      read: false
    },
    {
      fromName: 'Moe Chamont',
      subject: 'Family Calendar - Version 1',
      date: 'Last Week',
      id: 6,
      read: false
    },
    {
      fromName: 'Kelly Richardson',
      subject: 'Placeholder Headhots',
      date: 'Last Week',
      id: 7,
      read: false
    }
  ];

  constructor(private http: HttpClient) { }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getMessageById(id: number): Message {
    return this.messages[id];
  }

  public getFilms(searchText: string = 'start', page: number = 1): Observable<IFilm[]> {
    if (!searchText || searchText.length < 1) {
      searchText = 'star'
    }
    return this.http.get(
      `https://api.themoviedb.org/3/search/movie?api_key=8f9924092d262f879f8a54dcabd2ce2f&query=${searchText}&language=fr&page=${page}`
    ).pipe(
      map((data: any) => {
        const iFilms: IFilm[] = data.results as IFilm[]
        return iFilms
      }
      )
    )
  }

  public getFilmById(id: string): Observable<IFilm> {

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=8f9924092d262f879f8a54dcabd2ce2f&language=fr`
    return this.http.get<IFilm>(url)

  }

  getPostPath(poster_path): string {
    return `https://image.tmdb.org/t/p/w300${poster_path}`;
  }

}
