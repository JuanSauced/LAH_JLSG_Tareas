import { Task } from './../models/task';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private angularFirestore: AngularFirestore) {

  }
  public getTasks(): Observable<Task[]> {
    return this.angularFirestore.collection('tasks').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Task;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
    );
  }
  public async updateStatus(task: Task, id: string) {
    try {
      let result = await this.angularFirestore.collection("tasks").doc(id).update(task);
      return result
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public addTask(task:Task) {
    return this.angularFirestore.collection("tasks").add(task);
  }
  public removeTask(id:string){
    this.angularFirestore.collection("tasks").doc(id).delete();
  }
}
