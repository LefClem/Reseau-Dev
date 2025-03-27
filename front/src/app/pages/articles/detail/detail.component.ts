import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Article } from 'src/app/interfaces/Article.interface';
import { ArticlesServices } from 'src/app/services/article.services';
import { CommentaryServices } from 'src/app/services/commentary.services';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public isError: boolean = false;

  constructor(
    private articleServices: ArticlesServices,
    private fb: FormBuilder,
    private commentaryServices: CommentaryServices
  ) { }

  public form = this.fb.group({
    content: [
      '',
      [
        Validators.required,
        Validators.min(10),
        Validators.max(255)
      ]
    ]
  })

  private route = inject(ActivatedRoute);
  id = this.route.snapshot.params['id'];

  public article!: Article;

  ngOnInit(): void {
    this.articleServices.getArticleById(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(article => {
        this.article = article;
      });
  }

  onSubmit(articleId: number): void {
    const formValue = this.form.get('content')?.value as string;

    if (!formValue || formValue.trim().length < 5) {
      this.isError = true;
      return;
    }

    this.commentaryServices.addComment({ id: articleId, content: formValue }).subscribe({
      next: (newComment) => {

        // Met à jour localement sans recharger depuis l’API
        this.article.commentaries.push(newComment);

        // Réinitialise le formulaire
        this.form.reset();
      },
      error: (error) => {return error}
    });
    this.isError = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
