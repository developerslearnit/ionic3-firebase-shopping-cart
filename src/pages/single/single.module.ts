import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SinglePage } from './single';

@NgModule({
  declarations: [
    SinglePage,
  ],
  imports: [
    IonicPageModule.forChild(SinglePage),
  ],
})
export class SinglePageModule {}
