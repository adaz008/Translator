import { Component } from '@angular/core';
import { Service} from './thesaurus.service';

@Component({
  templateUrl: 'thesaurus.component.html',
  styleUrls: [ './thesaurus.component.scss' ],
  providers: [Service]
})

export class ThesaurusComponent {
  //Language code-name pairs
  languages = new Map<string, string>();
  keys: string[] = [];

  //Synonyms
  result:string[] = [];

  selectedLanguage : string = '';
  selectedLanguageCode: string | undefined = '';
  errorMessage = '';
  errorMessageForSynonyms = '';

  constructor(private service: Service){}

  //Sets language code-name pairs
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

    //Sets keys from the map
    this.keys = Array.from(this.languages.keys());
  }

  //Removes error message if selectbox value changes
  onSelectboxChanged(){
    this.errorMessageForSynonyms = '';
  }

  //Removes error message if input field changes
  onTextareaChange(){
    this.errorMessageForSynonyms = '';
  }

  synonyms(){
    //Finds the text input and get it's value
    const textInput = document.getElementById('text-input') as HTMLTextAreaElement;
    const inputValue = textInput.value;

    if(this.selectedLanguage == undefined || this.selectedLanguage == "" ||  inputValue == ""){
      if(this.selectedLanguage == undefined ||this.selectedLanguage == "")
        this.errorMessage = 'Please select language';  //If language is not selected
      else if(inputValue == "")
        this.errorMessage = 'Please provide input text.';  //If input field is empty

      setTimeout(() => {
        this.errorMessage = '';
      }, 3000); 
    }else {
      //Gets language code based on the language name
      this.selectedLanguageCode = this.languages.get(this.selectedLanguage);
      if(this.selectedLanguageCode != undefined)
        this.service.getSynonyms(this.selectedLanguageCode,inputValue).subscribe(
          (response : any) => {
            this.result = [];
            this.errorMessageForSynonyms = '';
            for(const element of response.response){
              this.result = this.result.concat(element.list.synonyms.split("|")); //Fill result array with synonyms
            }
          }, 
          error =>{
            this.result = [];
            this.errorMessageForSynonyms = 'No synonyms found'; // Display error it there's no synonyms
          }
        );
   }
}
}