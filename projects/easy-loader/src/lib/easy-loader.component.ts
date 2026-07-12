import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { EasyLoaderService } from './easy-loader.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'easy-loader-wrapper',
    imports: [CommonModule, NgOptimizedImage],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'easy-loader.component.html',
    styleUrl: 'easy-loader.component.scss'
})
export class EasyLoaderComponent implements OnInit {

  @Input() indicatorAsset?: string;
  @Input() indicatorWidth: number = 200;
  @Input() indicatorHeight: number = 200;

  showUiBlocker = false;

  constructor(private cdr: ChangeDetectorRef, private store: EasyLoaderService) { }

  ngOnInit(): void {
    this.store.allEvents.subscribe(events => {
      if (events) {
        if (events.length == 0) {
          this.showUiBlocker = false;
        } else {
          if (events.some(p => p.includes('*'))) {
            this.showUiBlocker = true;
          } else {
            this.showUiBlocker = false;
          }
        }
        this.cdr.detectChanges();
      }
    });
  }

}
