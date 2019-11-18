import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { 
  
  }

  getTasks() {  	
    return this._http.get('/tasks');
  }

  getOneTask(_id: string) {
    return this._http.get(`/tasks/${_id}`);
  }

  addTask(newTask: any) {
    return this._http.post('/tasks', newTask);
  }

  updateTask(editTask) {
    return this._http.put(`/tasks/${editTask._id}`, editTask);
  }

  removeTask(id: string) {
    return this._http.delete(`/tasks/${id}`);
  }
}
