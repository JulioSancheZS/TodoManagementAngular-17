export interface IUser {
    id?: number,
    correo: string,
    pass: string,
    nombre: string,
    apellido: string
}

export interface ILogin {
    email: string,
    pass: string
}

export interface ILoginResponse{
    status: boolean,
    msg: string,
    token: string,
    value: IUser
}