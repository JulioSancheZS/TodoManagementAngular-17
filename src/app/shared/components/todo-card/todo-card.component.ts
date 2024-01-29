import { Component, Input } from '@angular/core';
import { ITodo } from '../../../core/models/todo.model.ts';


export type ITodoType = 'Backlog' | 'En Proceso' | 'Terminada' | 'Cancelada' | 'Planificada' | 'Pausada'
export const ITodoStatus = ['Backlog', 'En Proceso', 'Terminada', 'Cancelada', 'Planificada', 'Pausada']

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {

  @Input() type: ITodoType = 'Backlog'
  @Input() todo!: ITodo

}
