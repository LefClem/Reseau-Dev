import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, forkJoin } from 'rxjs';
import { Subject } from 'src/app/interfaces/Subject.interface';
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

  public subjects$: Observable<Subject[]> = this.subjectServices.getSubjects();
  public updatedSubjects: any[] = [];

  ngOnInit(): void {
    this.getUpdatedSubjectsList();
  }

  subscribe(id: number) {
    this.subscriptionService.subscribe(id).subscribe({
      next: (response) => {
        console.log(response);
        this.getUpdatedSubjectsList();
      },
      error: (err) => console.error("Erreur d'abonnement: ", err)

    })
  }


  getUpdatedSubjectsList() {
    this.subjectServices.getSubjects().subscribe(subjects => {
      this.subscriptionService.getSubscriptions().subscribe(userSubscriptions => {
        this.updatedSubjects = subjects.map((subject: { id: number; }) => ({
          ...subject,
          isSub: userSubscriptions.some(sub => sub.subject.id === subject.id)
        }));
      });
    });
  }

}
