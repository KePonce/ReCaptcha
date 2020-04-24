import React        from 'react';
import InputField   from './InputField';
import ActionButon  from './ActionButton';
import Usuarios     from './Almacenamiento/Usuarios';
import Recaptcha    from 'react-recaptcha';

class LoginForm extends React.Component {

  constructor(props){
    super(props);
      this.recaptchaloaded = this.recaptchaloaded.bind(this);
      this.verifyCallback = this.verifyCallback.bind(this);
      this.state = {
      username: '',
      password: '',
      isVerified: false,
      buttonDisabled: false
    }
  }

  setInputValue(property, val){
    val = val.trim();
    if (val.lenght >12) {
      return;
    }

    this.setState({
      [property]: val
    })
  }

  resetForm(){
    this.setState({
      username: '',
      password: '',
      isVerified: false,
      buttonDisabled: false
    })
  }

  recaptchaloaded(){
    console.log("Se ha insertado el recaptcha");
  }

  verifyCallback(recaptchaToken){
    this.setState({
      isVerified: recaptchaToken
    })

    console.log(this.state.isVerified)
    
  }
  async doLogin(){
    /*if (!this.state.username) {
      return;
    }
    if (!this.state.password) {
      return;
    }
    */
   console.log(this.state.isVerified);
    this.setState({
      buttonDisabled:true
    })

    try {
      let res = await fetch('/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          verified: this.state.isVerified,
        })
      });  

      let result = await res.json();
      if (result && result.success) {
        Usuarios.IsLoggedIn = true;
        Usuarios.username = result.username;
      }
      else if (result && result.success === false) {
        this.resetForm();
        alert(result.msg);
      }
    } catch (e) {
      console.log(e);
      this.resetForm();
    }
  }

  render(){ 
    return (
      <div className="loginForm">
        <h3> Bienvenido </h3>

        <InputField
          type='text'
          placeholder='Username'
          value={this.state.username ? this.state.username : ''}
          onChange= {(val) => this.setInputValue('username',val)}
        />
        <InputField
          type='password'
          placeholder='Password'
          value={this.state.password ? this.state.password : ''}
          onChange= {(val) => this.setInputValue('password',val)}
        />
        
        <Recaptcha
        sitekey="6LeI6ewUAAAAAD7705euj7dv5CMPN9VRE7pORTpe"
        render="explicit"
        onloadCallback={this.recaptchaloaded}
        verifyCallback={this.verifyCallback}
      />
        <ActionButon
          text = 'Entrar'
          disabled = {this.state.buttonDisabled}
          onClick = {() => this.doLogin()}
        />

        

      
      </div> 
    );
  }
}

export default LoginForm;
