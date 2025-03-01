import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticlesServices } from 'src/app/services/articles.services';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  constructor(
    private router: Router,
    private articleServices: ArticlesServices
    ) { }
    
  public token = localStorage.getItem("token");
  public articles$: Observable<any> = this.articleServices.getArticles();
    
  ngOnInit(): void {
  }

  linkToDetail(id: number){
    this.router.navigate([`/detail/${id}`])
    console.log(id)
  }

}
