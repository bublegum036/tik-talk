import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Suggestions } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class DadataService {
  #apiUrl = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  #http = inject(HttpClient);
  #dadataToken = '9a0f980d7191e1d4a80098480fd2fb44c22d1198';

  getSuggestion(query: string) {
    return this.#http.post<{ suggestions: Suggestions[] }>(this.#apiUrl, { query }, {
      headers: {
        Authorization: `Token ${this.#dadataToken}`
      }
    }).pipe(
      map(response => {
        return Array.from(new Set(response.suggestions.map((suggestion: Suggestions) => {
          return suggestion.data.city
        })));
      })
    );
  }
}