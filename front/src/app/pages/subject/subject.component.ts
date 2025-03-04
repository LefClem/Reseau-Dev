import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  ) {}

  public subjects$: Observable<any> = this.subjectServices.getSubjects();
  
  ngOnInit(): void {
  }

  subscribe(id: number) {
    this.subscriptionService.subscribe(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => console.error("Erreur d'abonnement: ", err)
      
    })
  }

}
