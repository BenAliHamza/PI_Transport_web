import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-transition-banner',
  templateUrl: './transition-banner.component.html',
  styleUrls: ['./transition-banner.component.scss']
})
export class TransitionBannerComponent {
  @Input() color! : string;
  @Input() backGroundColor!: string;
}
