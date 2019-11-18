import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service' ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'public'; 
  tasks: string[];
  oneTask: string;
  show: boolean = false;
  edit: boolean = false;
  editTask: any = {title: "", description: ""};
  
  _id: string;
  newTask: any = {title: "", description: ""};
  constructor(private _httpService: HttpService){}
  


  ngOnInit(){
  	this.getTasksFromService();
  }
  getTasksFromService(){
    let observable = this._httpService.getTasks();    
    observable.subscribe(data => {
      console.log('component has tasks!', data );
      this.tasks = data['data'];
    });
  }
  getTaskDetails(task) {
  	this._id = task._id;
  	console.log('1', task);
  	console.log('2', this._id);  	
    let observable = this._httpService.getOneTask(this._id);
    observable.subscribe(data => {
      console.log("got task" , data);      
      this.oneTask = data['data'];
      this.show = true;
    });
  }
  onSubmit(){
  	let temp = this._httpService.addTask(this.newTask);
  	temp.subscribe(data => {
  		console.log('create', data);
  		this.newTask = { title: "", description: ""};
  		this.getTasksFromService();
  	});
  }
  // createTask() {
  //   let observable = this._httpService.addTask(this.newTask);
  //   observable.subscribe( data => {console.log ('added', data));    

  // }
 //  editForm(task){
	// // this.editTask = {_id: task._id, title: task.title, description: task.description}
	// this.edit = true;
	// let temp = this._httpService.updateTask(this.editTask);
	// temp.subscribe(data => {
	// 	console.log('edit', data);
	// 	this.editTask = { title: "", description: ""};
	// 	// this.editTask = { title: "task['title']", description: "task['description']"};
	// 	this.getTasksFromService();
	// })
 //  }
  editForm(task){
    this.editTask = {_id: task._id, title: task.title, description: task.description}
    this.edit = true;
  }

  onEdit(){
    let observable = this._httpService.updateTask(this.editTask);
    observable.subscribe(data => {
      console.log("~Edit~", data);
      this.edit = false;
      this.getTasksFromService();
    })
  }
  onDelete(task){
  	this._id = task._id;
  	let temp = this._httpService.removeTask(this._id);
  	temp.subscribe(data => {
  		console.log("Delete", data);
  		this.getTasksFromService();

  	})
  }

}
