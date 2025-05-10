export interface datosFormularioAsistencia{
    docentes: datosDocente [];
    estudiantes: datosEstudiantes;
    qr: Qr;
}

export interface datosDocente{
    cedula: string;
    programa: string;
    asignatura: string;
    
}
export interface Qr{
    id: number;
    qr: string;
}
export interface datosEstudiantes{
    cedulaEstudiante: string;
    idQr: any;
    }