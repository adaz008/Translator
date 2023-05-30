import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DxDataGridModule, DxFormModule, DxSelectBoxModule, DxTemplateModule } from 'devextreme-angular';
import { TranslateComponent } from './pages/translate/translate.component';
import { ThesaurusComponent } from './pages/thesaurus/thesaurus.component';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: 'translate',
    component: TranslateComponent
  },
  {
    path: 'synonyms',
    component: ThesaurusComponent
  },
  {
    path: '**',
    redirectTo: 'translate'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule ,DxSelectBoxModule,
    DxTemplateModule, CommonModule],
  exports: [RouterModule],
  declarations: [
    TranslateComponent,
    ThesaurusComponent
  ]
})
export class AppRoutingModule { }
