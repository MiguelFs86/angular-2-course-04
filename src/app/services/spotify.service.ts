import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

	artistas = [];
  urlSpotify: string = 'https://api.spotify.com/v1';
  token: string = 'BQBXPQGEtcS2K-PUI9HtVNg-i3E7-9WFLQPU-0nY02BD-OSsnMk6EtZkM7yIMAvGgs01a3jmnxmHwpdk49g';

  	constructor(public http:HttpClient) { 
  		console.log("Spotify service ready.");
  	}

    private getHeaders(): HttpHeaders{
      let headers = new HttpHeaders({
        'authorization':'Bearer ' + this.token
      });
      return headers;
    }

  	getArtistas(termino:string){
  		let url = `${ this.urlSpotify }/search?query=${termino}&type=artist&market=US&limit=20`;

  		return this.http.get(url, {headers: this.getHeaders()})
  			.map((resp:any) => {
  				this.artistas = resp.artists.items;
  				return this.artistas;
  			});
  	}

    getArtista(id:string){
      let url = `${  this.urlSpotify }/artists/${id}`;
      
      return this.http.get(url, {headers: this.getHeaders()});
    }

    getTop(id:string){
      let url = `${  this.urlSpotify }/artists/${id}/top-tracks?country=ES`;

      return this.http.get(url, {headers: this.getHeaders()});
    }

}
