import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TransitionBannerComponent} from "./transition-banner/transition-banner.component";



@NgModule({
  declarations: [
    TransitionBannerComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    TransitionBannerComponent
  ]
})
export class SharedModule { }
