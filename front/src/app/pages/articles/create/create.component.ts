import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleRequest } from 'src/app/interfaces/ArticleRequest.interface';
import { ArticlesServices } from 'src/app/services/article.services';
import { SubjectServices } from 'src/app/services/subject.services';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnDestroy {
  public subjectsList$ = this.subjectService.getSubjects();
  private createSubscription!: Subscription;

  public form = this.fb.group({
    subject_id: [
      1,
      Validators.required
    ],
    title: [
      '',
      [
        Validators.required
      ]
    ],
    content: [
      '',
      [
        Validators.required
      ]
    ]
  })

  constructor(
    private subjectService: SubjectServices,
    private articleServices: ArticlesServices,
    private fb: FormBuilder,
    private router: Router
  ) { }

  onSubmit(): void {
    const articleRequest = {
      ...this.form.value,
      subject_id: Number(this.form.value.subject_id)
    } as ArticleRequest;

    this.createSubscription = this.articleServices.createArticle(articleRequest).subscribe({
      next: value => this.router.navigate(['/feed']),
      error: error => {}
    })
  }

  ngOnDestroy(): void {
      if(this.createSubscription){
        this.createSubscription.unsubscribe();
      }
  }

}
