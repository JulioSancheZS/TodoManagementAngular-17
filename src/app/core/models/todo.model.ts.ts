import { ITodoType } from "../../shared/components/todo-card/todo-card.component";

export interface IResponse<T> {
    status: boolean,
    msg?: string
    value: T,
}

export interface ITodo {
    idTarea?: number,
    titulo: string;
    descripcion: string;
    estadoTarea: ITodoType,
    idEstadoTarea?: number,
    idUsuario?: number
}

export interface ITodoAdd {
    idTarea?: number,
    titulo: string;
    descripcion: string;
    idEstadoTarea?: number,
    idUsuario?: number
}

