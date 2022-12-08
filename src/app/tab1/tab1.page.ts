import { TaskService } from './../services/task.service';
import { Component } from '@angular/core';
import { Task } from '../models/task';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public tasks: Task[]
  public task: string;
  constructor(private taskService:TaskService,private alertController:AlertController) {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
    });
  }
  public taskCompleted(id : string,taskN: string){
    let tassk: Task;
      tassk = {
        task: taskN,
        status: "Completada"
      }
    this.taskService.updateStatus(tassk,id);
  }
  public addTask(){
    let tassk: Task;
    tassk = {
      task: this.task,
      status: "Pendiente"
    }
    this.taskService.addTask(tassk)
  }
  public async removeTask(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmacion',
      subHeader: '¿Estás seguro que deseas eliminar?',
      message: 'Esto es una confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel',
          handler: () => {

          }
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.taskService.removeTask(id);
          }
        }
      ]
    });

    await alert.present();

  }
}
