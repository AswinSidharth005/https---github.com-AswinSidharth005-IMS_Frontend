import { Component } from '@angular/core';

@Component({
  selector: 'about-us',
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  feedbacks: Feedback[];
  constructor() {
    this.feedbacks = [
      new Feedback("Managing my policy was effortless.The platform is fast and user-friendly.", "Virat Kholi",1),
      new Feedback("Claim process was smooth and quick.I felt supported at every step.Truly a service I can trust.","Samantha",2),
      new Feedback("Everything is just a click away. Transparent, reliable Highly recommend to friends and family.","Dhoni",3)
      
    ]
  }
}
class Feedback {
  comments: string;
  name: string;
  id:number

  constructor(comments: string, name: string, id:number) {
    this.comments = comments;
    this.name = name;
    this.id=id;
  }

}
