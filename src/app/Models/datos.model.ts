export interface datosFormularioAsistencia{
    docentes: datosDocente;
    asignaturas: Asignaturas [];
    programas:Programa[];
    estudiantes: datosEstudiantes;
    qr: Qr;
}

export interface datosDocente{
    cedulaProfesor: string;
    idPrograma:     number;
    idAsignatura:   number;
}
export interface Programa {
    idPrograma:     number;
    nombrePrograma: string;
    idCategoria:    number;
}
export interface Asignaturas{
    idAsignatura: number;
    nombreAsignatura: string;
}
export interface Qr{
    id: number;
    qr: string;
}
export interface datosEstudiantes{
    identificacion: string;
    idQr: string;
    }