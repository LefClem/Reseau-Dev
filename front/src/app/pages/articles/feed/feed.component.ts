import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticlesServices } from 'src/app/services/article.services';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  constructor(
    private articleServices: ArticlesServices
    ) { }
    
  public articles$: Observable<any> = this.articleServices.getArticles();
  public user = localStorage.getItem("token");

  ngOnInit(): void {
  }

}
