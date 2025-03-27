import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Subject as Subjects } from 'src/app/interfaces/Subject.interface';
import { SubjectServices } from 'src/app/services/subject.services';
import { SubscriptionServices } from 'src/app/services/subscription.services';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  constructor(
    private subjectServices: SubjectServices,
    private subscriptionService: SubscriptionServices
  ) { }

  public isSub: any;

  public subjects$: Observable<Subjects[]> = this.subjectServices.getSubjects();
  public updatedSubjects: any[] = [];
  private destroy$ = new Subject<void>();


  ngOnInit(): void {
    this.getUpdatedSubjectsList();
  }

  subscribe(id: number): void {
    this.subscriptionService.subscribe(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.getUpdatedSubjectsList();
      },
      error: () =>  {}
    })
  }


  getUpdatedSubjectsList(): void {
    this.subjectServices.getSubjects().subscribe(subjects => {
      this.subscriptionService.getSubscriptions().pipe(takeUntil(this.destroy$)).subscribe(userSubscriptions => {
        this.updatedSubjects = subjects.map((subject: { id: number; }) => ({
          ...subject,
          isSub: userSubscriptions.some(sub => sub.subject.id === subject.id)
        }));
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
