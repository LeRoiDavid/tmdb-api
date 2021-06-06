import { Component, OnInit, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DataService, IFilm, Message } from '../services/data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() film: IFilm;

  constructor(
    private data: DataService,
    private router: Router
  ) { }

  ngOnInit() { }

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }

  onShow(film: IFilm) {
    // let navigationExtra: NavigationExtras = {
    //   state: film
    // }
    // console.log(film);


    // this.router.navigate(["detail-film"], navigationExtra)
  }

  getFilmImage() {
    return this.data.getPostPath(this.film.poster_path)
  }

  substring(text: string): string {
    return text.length > 160 ? text.slice(0, 160) + "..." : text
  }
}
