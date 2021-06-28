import { Component, OnInit } from '@angular/core';
import { AppAPIService } from './servises';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'front-end';

  constructor(public appApi: AppAPIService) { }

  ngOnInit(): void {
    
  }
  
}
