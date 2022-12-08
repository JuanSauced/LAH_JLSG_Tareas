import { TaskService } from './../services/task.service';
import { Component } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public tasks: Task[]
  constructor(private taskService:TaskService) {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
    });
  }
  public taskNoCompleted(id : string,taskN: string){
    let tassk: Task;
      tassk = {
        task: taskN,
        status: "Pendiente"
      }
    this.taskService.updateStatus(tassk,id);
  }

}
