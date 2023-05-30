import { Component } from '@angular/core';
import { Service } from './translate.service';
import { DxTemplateModule } from 'devextreme-angular';

@Component({
  templateUrl: 'translate.component.html',
  styleUrls: [ './translate.component.scss' ],
  providers: [Service]
})

export class TranslateComponent {
  languages = new Map<string, string[]>();

  languageLookUp = new Map<string, string>();

  keysLanguages: any;
  valuesLanguage : any;

  selectedSourceLanguage : any;
  selectedTargetLanguage : any;
  translatedWord:any = "";

   errorMessage = '';
   errorMessageForTranslate = '';

  constructor(private service: Service){}

  ngOnInit(){
    this.service.getLanguages().subscribe(
      (response: any) => {
        response.forEach((current: string) => {
          const languagePairs: string[] = current.split("-");
  
          if (!this.languages.has(languagePairs[0])) {
            this.languages.set(languagePairs[0], [languagePairs[1]]);
          } else {
            this.languages.get(languagePairs[0])?.push(languagePairs[1]);
          }
        });

        this.setLanguageMapping();
        
        this.keysLanguages = Array.from(this.languages.keys()).map((key: string) => this.languageLookUp.get(key));
      }
    );
  }
  
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

  getKeyByValue(map: Map<any, any>, value: any): any | undefined {
    for (const [key, mapValue] of map.entries()) {
      if (mapValue === value) {
        return key;
      }
    }
    return undefined;
  }
  

  onSourceChanged(event:any){
    let code = this.getKeyByValue(this.languageLookUp, event.value);
    if(code != undefined)
      this.valuesLanguage = this.languages.get(code)?.map((key: string) => this.languageLookUp.get(key));

    this.selectedTargetLanguage="";
    this.translatedWord = "";
    this.errorMessageForTranslate = '';
  }

  onTargetChanged(event:any){
    this.selectedTargetLanguage = event.value;
    this.translatedWord = "";
    this.errorMessageForTranslate = '';
  }

  onTextareaChange(){
    this.errorMessageForTranslate = '';
  }



  onClick(){
    const textInput = document.getElementById('text-input') as HTMLTextAreaElement;
    const inputValue = textInput.value;

    if(this.selectedSourceLanguage == undefined || this.selectedTargetLanguage == undefined ||  inputValue == "" || this.selectedSourceLanguage == "" || this.selectedTargetLanguage == ""){
      if(this.selectedSourceLanguage == undefined ||this.selectedSourceLanguage == "")
        this.errorMessage = 'Please select source language';  
      else if(this.selectedTargetLanguage == undefined ||this.selectedTargetLanguage == "")
        this.errorMessage = 'Please select target language';  
      else if(inputValue == "")
        this.errorMessage = 'Please provide input text.';  

      setTimeout(() => {
        this.errorMessage = '';
      }, 3000); 
    }else {
      let selectedSourceCode = this.getKeyByValue(this.languageLookUp, this.selectedSourceLanguage);
      let selectedTargetCode = this.getKeyByValue(this.languageLookUp, this.selectedTargetLanguage);
      this.service.translate(selectedSourceCode, selectedTargetCode, inputValue).subscribe(
        (data: any) => {
          this.translatedWord = '';
          this.errorMessageForTranslate = '';
          if(data.def[0] !== undefined)
            this.translatedWord = data.def[0].tr[0];
          else
            this.errorMessageForTranslate = 'No translation';
      }
    );
    }
  
  }

}
