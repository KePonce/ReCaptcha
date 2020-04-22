import { extendObservable } from 'mobx';

/**Almacenamiento de Usuarios */

class Usuario{
    constructor(){
        extendObservable(this, {
            loading: true,
            IsLoggedIn: false,
            UserName: ''
        })
    }
    
}

export default new Usuario();