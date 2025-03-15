import { Commentary } from "./Commentary.interface";
import { Subject } from "./Subject.interface";
import { User } from "./User.interface";

export interface Article {
    id: number,
    title: string, 
    content: string,
    created_at: Date,
    user: User,
    commentaries: Commentary[],
    subject: Subject
}