import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class Service {

    private yandexApiKey = 'dict.1.1.20230521T090942Z.3be9cb1a8e1458fb.80cad31ea47c187534e3f48b4431298b50a920c0';

    constructor(private http: HttpClient) {}

    getLanguages(){
        const url = 'https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key='+this.yandexApiKey;
        return this.http.get(url);
    }

    translate(source: string,  target: string,  text: string){
        const url = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key='+this.yandexApiKey + '&lang=' + source + '-' + target + '&text=' + text;
        return this.http.get(url);
    }
}