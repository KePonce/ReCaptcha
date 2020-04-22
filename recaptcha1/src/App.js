import React        from 'react';
import {observer}   from 'mobx-react';
import Usuarios     from './Almacenamiento/Usuarios';
import LoginForm    from './LoginForm';
import ActionButton from './ActionButton';
import './App.css';

class App extends React.Component {

  async componentDidMount(){
    try {
      let res = await fetch('/IsLoggedIn', {
          method: 'post',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      });

      let result = await res.json();

      if (result && result.success){
        Usuarios.loading = false;
        Usuarios.IsLoggedIn = true;
        Usuarios.UserName = result.UserName;
      }
      else{
        Usuarios.loading = false;
        Usuarios.IsLoggedIn = false;
      }
      
    } catch (e) {
        Usuarios.loading = false;
        Usuarios.IsLoggedIn = false;
    }
  }


  async doLogout(){
    try {
      let res = await fetch('/logout', {
          method: 'post',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      });

      let result = await res.json();

      if (result && result.success){
        Usuarios.IsLoggedIn = false;
        Usuarios.UserName = '';
      }
      
    } catch (e) {
        console.log(e)
    }
  }


  render(){ 
    if(Usuarios.loading){
      return (
        <div className="app">
          <div className="container">
            Cargando, Por favor espere...
          </div>
        </div>
      );
    }
    else{
      if (Usuarios.IsLoggedIn) {
        return (
          <div className="app">
            <div className="container">
              Bienvenido {Usuarios.UserName}

              <ActionButton
                  text = {'Cerrar Sesion'}
                  disabled = {false}
                  onClick={()=>this.doLogout()}
              />
            </div>
          </div>
        );
      }
      return (
        <div className="app">
          <div className="container">
            <LoginForm/>
          </div>
        </div>
      );
    }
  }
}

export default observer(App);
