import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EasyLoaderService } from './easy-loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'easy-loader-wrapper',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'easy-loader.component.html',
  styleUrl: 'easy-loader.component.scss',
})
export class EasyLoaderComponent implements OnInit {

  showUiBlocker = false;

  constructor(private cdr: ChangeDetectorRef, private store: EasyLoaderService) {}

  ngOnInit(): void {
    this.store.allEvents.subscribe(events => {
      if(events) {
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
