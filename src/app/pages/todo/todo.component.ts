import { Component, OnInit, inject } from '@angular/core';
import {
  ITodoStatus,
  TodoCardComponent,
} from '../../shared/components/todo-card/todo-card.component';
import { TodoService } from '../../core/services/todo.service';
import { ITodo, ITodoAdd } from '../../core/models/todo.model.ts';
import { SlidePanelComponent } from '../../shared/ui/slide-panel/slide-panel.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IEstadoTarea } from '../../core/models/estadoTarea';
import { AuthService } from '../../core/services/auth.service';
import { TokenService } from '../../core/services/token.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoCardComponent, SlidePanelComponent, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;

  todos: ITodo[] = [];
  estado: IEstadoTarea[] = [];

  isSlidePanelOpen = false;
  todoStatus = ITodoStatus;

  filtroPorIdEstado?: number | null

  idTarea?: number


  private jwtDecodeService = inject(AuthService)
  decode: any

  constructor(private todoService: TodoService, private fb: FormBuilder, private tokenService: TokenService) {
    this.todoForm = this.fb.group({
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });

      const token = this.tokenService.getToken()

    // Verificar si el token es null y proporcionar un valor predeterminado (puede ser un objeto vacío)
      this.decode = token ? this.jwtDecodeService.decodeToken(token) : {};

      //console.log(this.decode)
  }

  
  ngOnInit(): void {
    this.getAllTodo();
    this.getEstadoTareas();
  }


  filtroPorEstado(idEstadoTarea?: number | null){
    this.filtroPorIdEstado = idEstadoTarea
    this.getAllTodo();
  }

  getEstadoTareas() {
    this.todoService.getEstadoTodo().subscribe({
      next: (response) => {
        this.estado = response.value;
      },
    });
  }

  getAllTodo() {
    // this.todos = this.todoService.getAllTodo();
    this.todoService.getAllTodo(this.filtroPorIdEstado).subscribe({
      next: (response) => {
        if(response.status){
          this.todos = response.value;

        }else{
          console.log(response.msg)
        }
      },
      error: (error) => {
        console.error(error)
      }
    });
  }

  onCloseSlidePanel() {
    this.isSlidePanelOpen = false;
    this.todoForm.reset()
    this.idTarea = 0
    
  }

  openSlidePanel() {
    this.isSlidePanelOpen = true;
  }

  onSubmit() {
    if (this.todoForm.valid) {
      //Obtener los datos del formulario
      const todo: ITodoAdd = {
        titulo: this.todoForm.value.titulo,
        descripcion: this.todoForm.value.descripcion,
        idEstadoTarea: this.todoForm.value.status, //IdEstado
        idUsuario: this.decode.IdUsuario,
        idTarea: this.idTarea
      };


      console.log(this.idTarea)

      if(this.idTarea != null){


      this.todoService.updateTodo(todo).subscribe({
        next: (response) => {
          if(response.status){
            this.getAllTodo();
            this.onCloseSlidePanel();
          }else{
            console.log(response.msg)
          }

        },
        error: (error) => {
          console.log(error)
        }
      });

      }else{
        this.todoService.addTodo(todo).subscribe({
          next: (response) => {
            if(response.status){
              this.getAllTodo();
              this.onCloseSlidePanel();
            }else{
              console.log(response.msg)
            }
          },
          error: (error) => {
            console.log(error)
          }
        });
      }
    } else {
      this.todoForm.markAsTouched();
    }
  }

  onLoadForm(item: ITodo) {
    this.idTarea = item.idTarea;
    this.todoForm.patchValue({
      titulo: item.titulo,
      descripcion: item.descripcion,
      status: item.idEstadoTarea,
    });
    this.openSlidePanel();
  }
}
