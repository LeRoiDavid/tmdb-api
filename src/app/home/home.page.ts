import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DataService, IFilm, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public iFilms: IFilm[]
  searchTerme: string = ''
  page: number = 1

  constructor(
    private data: DataService,
    private router: Router
  ) {
    this.getFilms()
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  getFilms() {
    return this.data.getFilms()
      .subscribe(data => {
        this.iFilms = data
      });
  }

  onChangeValue(value: string) {
    this.searchTerme = value
    if (value.length > 0) {
      this.data.getFilms(this.searchTerme, this.page).subscribe(data => this.iFilms = data)
    }
  }

  loadData(event) {
    console.log(this.searchTerme);
    if (this.searchTerme.length < 1) {
      this.searchTerme = 'a'
      console.log('sear', this.searchTerme);

    }
    setTimeout(() => {
      this.page++
      this.data.getFilms(this.searchTerme, this.page)
        .subscribe(data => this.iFilms = [...this.iFilms, ...data])
      event.target.complete()
    }, 500);
  }

  onShow(film: IFilm) {
    let navigationExtra: NavigationExtras = {
      state: {
        film: film
      }
    }
    this.router.navigate(["detail-film"], navigationExtra)
  }

}
