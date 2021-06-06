import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, IFilm, Message } from '../services/data.service';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage implements OnInit {
  public film: IFilm;

  constructor(
    private router: Router,
    private data: DataService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.film = this.router.getCurrentNavigation().extras.state.film
        console.log(this.router.getCurrentNavigation().extras.state.film);

      }
    })
  }

  ngOnInit() {
    // const id = this.activatedRoute.snapshot.paramMap.get('id');
    // this.data.getFilmById(id).subscribe(data => this.film = data);
  }

  getBackButtonText() {
    return 'infos'
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }

  getFilmImage() {
    return this.data.getPostPath(this.film.poster_path)
  }


}
