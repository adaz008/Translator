import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class Service {

    private thesaurusApiKey = 'P9DzrelCRdZ8cJ5arGJs';

    constructor(private http: HttpClient) {}

    //Return synonyms for the current word in the current language
    getSynonyms(language: string, word: string){
        //const url = 'http://thesaurus.altervista.org/thesaurus/v1?word=' + word + '&language=' + language + '&output=json&key=' + this.thesaurusApiKey + '&callback=process';
        
        const url = 'http://thesaurus.altervista.org/thesaurus/v1?word=' + word + '&language=' + language + '&output=json&key=' + this.thesaurusApiKey;
        return this.http.get(url);
    }

}