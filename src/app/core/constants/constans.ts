export const constants = {
    CURRENT_TOKEN: 'CURRENT_TOKEN'
};

const apirUrl = 'https://localhost:7243/api'

export const apiEndPoint = {
    AuthEndPoint: {
        login: `${apirUrl}/authenticacion`
    },
    EstadoTareaEndPoint: {
        estadoTareaGet: `${apirUrl}/EstadoTarea/get`
    },
    TareasEndPoint: {
        tareaGet: `${apirUrl}/Tarea/get`,
        tareaPost: `${apirUrl}/Tarea/post`,
        tareaPut: `${apirUrl}/Tarea/editar`,

    }
}