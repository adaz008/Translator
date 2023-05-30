import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class Service {

    //Key for public api
    private yandexApiKey = 'dict.1.1.20230521T090942Z.3be9cb1a8e1458fb.80cad31ea47c187534e3f48b4431298b50a920c0';

    constructor(private http: HttpClient) {}

    //Returns the possible key-value language pairs
    getLanguages(){
        const url = 'https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key='+this.yandexApiKey;
        return this.http.get(url);
    }

    //Translate the text from source language to target language
    translate(source: string,  target: string,  text: string){
        const url = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key='+this.yandexApiKey + '&lang=' + source + '-' + target + '&text=' + text;
        return this.http.get(url);
    }
}