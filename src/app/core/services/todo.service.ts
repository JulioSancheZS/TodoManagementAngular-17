import { Injectable } from '@angular/core';
import { IResponse, ITodo, ITodoAdd } from '../models/todo.model.ts';
import { HttpClient } from '@angular/common/http';
import { apiEndPoint } from '../constants/constans.js';
import { Observable } from 'rxjs';
import { IEstadoTarea } from '../models/estadoTarea.js';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  //  todos: ITodo[] =  [{
  //   id:1,
  //   titulo: "Apreder angular 17",
  //   descripcion: "Motivacion",
  //   status: "DONE"
  //  }]

  constructor(private http: HttpClient) { }

  getAllTodo(idEstadoTarea?: number | null, idUsuario?: number): Observable<IResponse<ITodo[]>>{

    let queryString = ""
    if(idEstadoTarea != null){
      queryString = `${idEstadoTarea}`
    }


   return this.http.get<IResponse<ITodo[]>>(`${apiEndPoint.TareasEndPoint.tareaGet}?idEstadoTarea=${queryString}`)
    
  }

  addTodo( data: ITodoAdd): Observable<IResponse<ITodoAdd>>{
      return this.http.post<IResponse<ITodoAdd>>(`${apiEndPoint.TareasEndPoint.tareaPost}`, data)
  }

  updateTodo(data: ITodoAdd): Observable<IResponse<ITodoAdd>>{
    return this.http.put<IResponse<ITodoAdd>>(`${apiEndPoint.TareasEndPoint.tareaPut}`, data)
  }

  getEstadoTodo(): Observable<IResponse<IEstadoTarea[]>>{
    

    return this.http.get<IResponse<IEstadoTarea[]>>(`${apiEndPoint.EstadoTareaEndPoint.estadoTareaGet}`)
  }
}
