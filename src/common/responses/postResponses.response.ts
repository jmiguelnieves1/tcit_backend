/* eslint-disable prettier/prettier */
export const postResponses = {
    create: {
        error: {
            status: false,
            message: 'El post no pudo ser creado.' 
        },
        success: {
            status: true,
            message: 'El post se creo satisfactoriamente.' 
        }
    },
    delete: {
        error: {
            status: false,
            message: 'El post no pudo ser eliminado.' 
        },
        postNotExists: {
            status: false,
            message: 'El post que deseas eliminar no existe.'
        },
        success: {
            status: true,
            message: 'El post se elimino satisfactoriamente.' 
        }
    },
    list: {
        error: {
            status: false,
            message: 'Lost posts no pudieron ser listados.' 
        },
        success: {
            status: true,
            message: 'Los posts se han listado satisfactoriamente.' 
        }
    }
};
