import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ArticlesServices } from 'src/app/services/article.services';
import { CommentaryServices } from 'src/app/services/commentary.services';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
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

  public article: any;

  ngOnInit(): void {
    this.articleServices.getArticleById(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(article => {
        this.article = article;
      });
  }

  onSubmit(articleId: number) {
    const formValue = this.form.get('content')?.value as string;

    if (!formValue || formValue.trim().length < 5) {
      this.isError = true;
      console.log(this.isError);
      return;
    }
    

    this.commentaryServices.addComment({ id: articleId, content: formValue }).subscribe({
      next: (newComment) => {
        console.log("Commentaire ajouté :", newComment);

        // Met à jour localement sans recharger depuis l’API
        this.article.commentaries.push(newComment);
        this.articleServices.updateArticle(this.article);

        // Réinitialise le formulaire
        this.form.reset();
      },
      error: (err) => console.error("Erreur backend :", err)
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
