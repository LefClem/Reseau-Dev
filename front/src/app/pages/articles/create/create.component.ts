import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleRequest } from 'src/app/interfaces/ArticleRequest.interface';
import { ArticlesServices } from 'src/app/services/article.services';
import { SubjectServices } from 'src/app/services/subject.services';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  public subjectsList$ = this.subjectService.getSubjects();

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

  onSubmit() {
    const articleRequest = {
      ...this.form.value,
      subject_id: Number(this.form.value.subject_id)
    } as ArticleRequest;
    console.log(articleRequest);

    this.articleServices.createArticle(articleRequest).subscribe({
      next: value => this.router.navigate(['/feed']),
      error: error => console.log(error)
    })
  }

}
