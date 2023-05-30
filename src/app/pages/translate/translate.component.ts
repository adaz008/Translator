import { Component } from '@angular/core';
import { Service } from './translate.service';
import { DxTemplateModule } from 'devextreme-angular';

@Component({
  templateUrl: 'translate.component.html',
  styleUrls: [ './translate.component.scss' ],
  providers: [Service]
})

export class TranslateComponent {
  //Source-target language code pairs
  languages = new Map<string, string[]>();

  //Language name-code pairs
  languageLookUp = new Map<string, string>();

  //Source and target language names
  keysLanguages: any;
  valuesLanguage : any;

  
  selectedSourceLanguage : any;
  selectedTargetLanguage : any;
  translatedWord:any = "";

   errorMessage = '';
   errorMessageForTranslate = '';

  constructor(private service: Service){}

  //Initialize the source-target language pairs
  ngOnInit(){
    this.service.getLanguages().subscribe(
      (response: any) => {
        response.forEach((current: string) => {
          const languagePairs: string[] = current.split("-");
  
          if (!this.languages.has(languagePairs[0])) {
            this.languages.set(languagePairs[0], [languagePairs[1]]); // If key is a new language
          } else {
            this.languages.get(languagePairs[0])?.push(languagePairs[1]);  // If key is already exist
          }
        });

        this.setLanguageMapping();
        
        //Makes a language name array from code
        this.keysLanguages = Array.from(this.languages.keys()).map((key: string) => this.languageLookUp.get(key));
      }
    );
  }
  

  //Set language code and language name pairs
  setLanguageMapping(){
    this.languageLookUp.set("be", "Belarusian (Belarus)");
    this.languageLookUp.set("bg", "Bulgarian (Bulgaria)");
    this.languageLookUp.set("cs", "Czech (Czech Republic)");
    this.languageLookUp.set("da", "Danish (Denmark)");
    this.languageLookUp.set("de", "German (Germany)");
    this.languageLookUp.set("el", "Greek (Greece)");
    this.languageLookUp.set("en", "English (United Kingdom)");
    this.languageLookUp.set("es", "Spanish (Spain)");
    this.languageLookUp.set("et", "Estonian (Estonia)");
    this.languageLookUp.set("fi", "Finnish (Finland)");
    this.languageLookUp.set("fr", "French (France)");
    this.languageLookUp.set("hu", "Hungarian (Hungary)");
    this.languageLookUp.set("it", "Italian (Italy)");
    this.languageLookUp.set("lt", "Lithuanian (Lithuania)");
    this.languageLookUp.set("lv", "Latvian (Latvia)");
    this.languageLookUp.set("mhr", "Meadow Mari (Russia)");
    this.languageLookUp.set("mrj", "Hill Mari (Russia)");
    this.languageLookUp.set("nl", "Dutch (Netherlands)");
    this.languageLookUp.set("no", "Norwegian (Norway)");
    this.languageLookUp.set("pl", "Polish (Poland)");
    this.languageLookUp.set("pt", "Portuguese (Portugal)");
    this.languageLookUp.set("ru", "Russian (Russia)");
    this.languageLookUp.set("sk", "Slovak (Slovakia)");
    this.languageLookUp.set("sv", "Swedish (Sweden)");
    this.languageLookUp.set("tr", "Turkish (Turkey)");
    this.languageLookUp.set("tt", "Tatar (Russia)");
    this.languageLookUp.set("uk", "Ukrainian (Ukraine)");
    this.languageLookUp.set("zh", "Chinese (China)");
    this.languageLookUp.set("emj", "Emoji");
  }

  //Finds a key based on it's value in the map
  getKeyByValue(map: Map<any, any>, value: any): any | undefined {
    for (const [key, mapValue] of map.entries()) {
      if (mapValue === value) {
        return key;
      }
    }
    return undefined;
  }
  
  //Sets the possible value languages based on the selected key
  onSourceChanged(event:any){
    let code = this.getKeyByValue(this.languageLookUp, event.value);
    if(code != undefined)
      this.valuesLanguage = this.languages.get(code)?.map((key: string) => this.languageLookUp.get(key));

    this.selectedTargetLanguage="";
    this.translatedWord = "";
    this.errorMessageForTranslate = '';
  }

  //Sets the target language which was selected
  onTargetChanged(event:any){
    this.selectedTargetLanguage = event.value;
    this.translatedWord = "";
    this.errorMessageForTranslate = '';
  }

  //Set error message empty in text area changes
  onTextareaChange(){
    this.errorMessageForTranslate = '';
  }


  //Translates the word
  translate(){
    //Finds the text input and get it's value
    const textInput = document.getElementById('text-input') as HTMLTextAreaElement;
    const inputValue = textInput.value;


    if(this.selectedSourceLanguage == undefined || this.selectedTargetLanguage == undefined ||  inputValue == "" || this.selectedSourceLanguage == "" || this.selectedTargetLanguage == ""){
      if(this.selectedSourceLanguage == undefined ||this.selectedSourceLanguage == "")
        this.errorMessage = 'Please select source language';  //If source language is not selected
      else if(this.selectedTargetLanguage == undefined ||this.selectedTargetLanguage == "")
        this.errorMessage = 'Please select target language';  //If target language is not selected
      else if(inputValue == "")
        this.errorMessage = 'Please provide input text.';  //If input field is empty

      setTimeout(() => {
        this.errorMessage = '';
      }, 3000); 
    }else {
      //Finds source and target language's code
      //Then translate the input word
      let selectedSourceCode = this.getKeyByValue(this.languageLookUp, this.selectedSourceLanguage);
      let selectedTargetCode = this.getKeyByValue(this.languageLookUp, this.selectedTargetLanguage);
      this.service.translate(selectedSourceCode, selectedTargetCode, inputValue).subscribe(
        (data: any) => {
          this.translatedWord = '';
          this.errorMessageForTranslate = '';
          if(data.def[0] !== undefined)
            this.translatedWord = data.def[0].tr[0];
          else
            this.errorMessageForTranslate = 'No translation'; // Display error it there's no translation
      }
    );
    }
  
  }

}
