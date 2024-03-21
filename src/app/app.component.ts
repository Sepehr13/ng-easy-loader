import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ActionButton, BindTo, EasyLoaderComponent } from 'easy-loader';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, EasyLoaderComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'easy-loader-project';

  @BindTo("simpleGetReq", "1")
  isLoading1$!: Observable<boolean>;

  @BindTo("simpleGetReq", "2")
  isLoading2$!: Observable<boolean>;

  constructor(private service: AppService) {}

  ngOnInit(): void {}

  @ActionButton("simpleGetReq", "1")
  loadData1(): void {
    this.service.simpleGetReq().subscribe(data => {
      this.title = data;
    });
  }

  @ActionButton("simpleGetReq", "2")
  loadData2(): void {
    this.service.simpleGetReq(3000).subscribe(data => {
      this.title = data;
    });
  }
}
