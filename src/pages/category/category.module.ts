import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryPage } from './category';

@NgModule({
  declarations: [
    CategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryPage),
  ],
})
export class CategoryPageModule {}
