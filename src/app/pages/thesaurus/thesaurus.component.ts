import { Component } from '@angular/core';
import { Service} from './thesaurus.service';

@Component({
  templateUrl: 'thesaurus.component.html',
  styleUrls: [ './thesaurus.component.scss' ],
  providers: [Service]
})

export class ThesaurusComponent {
  languages = new Map<string, string>();
  keys: string[] = [];

  result:string[] = [];

  selectedLanguage : string = '';
  selectedLanguageCode: string | undefined = '';
  errorMessage = '';
  errorMessageForSynonyms = '';

  constructor(private service: Service){}

  ngOnInit(){
    this.languages.set('English (US)', 'en_US');
    this.languages.set('English (UK)', 'en_GB');
    this.languages.set('French (France)', 'fr_FR');
    this.languages.set('German (Germany)', 'de_DE');
    this.languages.set('Spanish (Spain)', 'es_ES');
    this.languages.set('Greek (Greece)', 'el_GR');
    this.languages.set('Danish (Denmark)', 'da_DK');
    this.languages.set('Czech (Czech Republic)', 'cs_CZ');
    this.languages.set('Swiss German (Switzerland)', 'de_CH');
    this.languages.set('Hungarian (Hungary)', 'hu_HU');
    this.languages.set('Italian (Italy)', 'it_IT');
    this.languages.set('Norwegian (Norway)', 'no_NO');
    this.languages.set('Polish (Poland)', 'pl_PL');
    this.languages.set('Portuguese (Portugal)', 'pt_PT');
    this.languages.set('Romanian (Romania)', 'ro_RO');
    this.languages.set('Russian (Russia)', 'ru_RU');
    this.languages.set('Slovak (Slovakia)', 'sk_SK');

    
    this.keys = Array.from(this.languages.keys());
  }

  onClick(){
    const textInput = document.getElementById('text-input') as HTMLTextAreaElement;
    const inputValue = textInput.value;

    if(this.selectedLanguage == undefined || this.selectedLanguage == "" ||  inputValue == ""){
      if(this.selectedLanguage == undefined ||this.selectedLanguage == "")
        this.errorMessage = 'Please select language';  
      else if(inputValue == "")
        this.errorMessage = 'Please provide input text.';  

      setTimeout(() => {
        this.errorMessage = '';
      }, 3000); 
    }else {
      this.selectedLanguageCode = this.languages.get(this.selectedLanguage);
      if(this.selectedLanguageCode != undefined)
        this.service.getSynonyms(this.selectedLanguageCode,inputValue).subscribe(
          (response : any) => {
            this.result = [];
            this.errorMessageForSynonyms = '';
            for(const element of response.response){
              this.result = this.result.concat(element.list.synonyms.split("|"));
            }

            console.log(this.result);
          }, 
          error =>{
            console.log(error);
            
            this.result = [];
            this.errorMessageForSynonyms = 'No synonyms found';
          }
        );
   }
}
}