import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-imdb';

  movies:any = [];
  movieTitle:any = '';
  releaseYear:string = '2019';
  private apiKey = "5d5b92fe43216932f678044e9359d13e";
  private movieApi = "https://api.themoviedb.org/3/discover/movie?api_key=" + this.apiKey + "&primary_release_year=" + this.releaseYear + "&language=en-US&sort_by=popularity.asc&include_adult=false&include_video=false&page=1";
  
  constructor(private http: Http) {
    this.getMovies();
    this.getData();
  }

  fetchMovies() {
    this.getMovies();
    this.getData();
  }

  getData() {
    this.movieApi = "https://api.themoviedb.org/3/discover/movie?api_key=" + this.apiKey + "&primary_release_year=" + this.releaseYear + "&language=en-US&sort_by=popularity.asc&include_adult=false&include_video=false&page=1";
    return this.http.get(this.movieApi)
    .map((res:Response) => res.json());
  }

  getMovies() {
    this.getData().subscribe(movies => {

      for (let i = 0; i < movies.results.length; i++) {
        console.log(movies.results[i].poster_path);
        if(movies.results[i].poster_path == null || 
          movies.results[i].overview == '') {
            movies.results.splice(i, 1);
            console.log("Successfully removed null object!");
        }
      }
      this.movies = movies;

    })
  }

}
