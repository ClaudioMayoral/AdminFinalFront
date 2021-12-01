import React, {useEffect} from 'react';
import {Routes,Route,Link,Outlet} from 'react-router-dom';
import './App.css'


function Encabezado(){
  return(
    <div className="container-fluid" className="container">
    <nav className="navbar navbar-expand-lg navbar-light bg-light" >
    <a className="navbar-brand" style={{float : 'right', paddingRight : '170px'}}href="/">Home</a>
    <a className="navbar-brand" style={{float : 'right', paddingRight : '170px'}}href="/candidato">Candidato</a>
    <a className="navbar-brand" style={{float : 'right', paddingRight : '170px'}}href="/vacante">Vacante</a>
    <a className="navbar-brand" style={{float : 'right', paddingRight : '170px'}}href="/cliente">Cliente</a>
    <a className="navbar-brand" style={{float : 'right', paddingRight : '170px'}}href="/vacantecandidato">Asignar candidato a vacante</a>
  </nav>
  </div>
  )
}

function Menu(){
  return(
    <div>
      <h2>Muchas gracias por usar la aplicación. Favor de elegir una opción</h2>
    </div>
  )
}

function MenuUsuario(){
  return(
    <div className="container-fluid" className="container">
      <br></br>
      <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" style={{float : 'left', paddingLeft : '200px'}}href="/candidato/info">Info del Candidato</a>
      <a className="navbar-brand" style={{float : 'right', paddingRight : '200px'}}href="/candidato/registrar">Registrar Candidato</a>         
      </nav>
      <Outlet/>       
    </div>
  )
}

function MenuCliente(){
  return(
    <div className="container-fluid" className="container">
    <br></br>
    <nav className="navbar navbar-dark bg-dark">
    <a className="navbar-brand" style={{float : 'left', paddingLeft : '200px'}}href="/cliente/info">Info del Cliente</a>
    <a className="navbar-brand" style={{float : 'right', paddingRight : '200px'}}href="/cliente/registrar">Registrar Cliente</a>         
    </nav>
    <Outlet/>       
  </div>
  )
}

function MenuVuelo(){
  return(
    <div className="container-fluid" className="container">
    <br></br>
    <nav className="navbar navbar-dark bg-dark">
    <a className="navbar-brand" style={{float : 'left', paddingLeft : '200px'}}href="/vacante/info">Información del Vacante</a>
    <a className="navbar-brand" style={{float : 'right', paddingRight : '200px'}}href="/vacante/crearvacante">Crear Vacante</a>         
    </nav>
    <Outlet/>       
  </div>

  )
}

function MenuBoleto(){
  return(

    <div className="container-fluid" className="container">
    <br></br>
    <nav className="navbar navbar-dark bg-dark">
    <a className="navbar-brand" style={{float : 'left', paddingLeft : '580px'}}href="/vacantecandidato/asignarvacante">Asignar Vacante</a>     
    </nav>
    <Outlet/>       
  </div>
  )
}


function Error404(){
  return(
    <div>
      <h1>404 (Not found)</h1>
      <Link to="/">Ir al Home</Link>
    </div>
  )
}

function Home(){
  //ComponentDidMount
  useEffect(()=>{
    console.log("ComponentDidMount en componente función")
  },[])
  return(
    <div>
      <h1>Home</h1>

    </div>
  )
}

class Usuario extends React.Component {

  constructor(){
    super()
    this.state={
      boletos:[],
      id: null,
      nombre:"",
      correo:"",
      escolaridad:"",
      carrera:"",
      requisitos:"",
    }
  }

  componentDidMount(){
  }

  info(info){
    this.conseguirDatos(info)
    this.conseguirBoletos(info)
  }

  async conseguirDatos(info){
    fetch(`http://localhost:8080/candidato/${info}`)
      .then(res=>res.json())
        .then(datos=>{
          console.log(datos)
          this.setState({
            nombre: datos.nombre,
            correo: datos.correo,
            escolaridad: datos.escolaridad,
            carrera: datos.carrera,
            requisitos: datos.requisitos,
          })
        })
        .catch(err=>{
          console.log("Servidor desconectado")
          console.log(err)
        })

  }


  async conseguirBoletos(info){
    fetch(`http://localhost:8080/vacantecandidato/candidato/${info}`)
      .then(res=>res.json())
        .then(boletos=>{
          console.log(boletos)
          this.setState({
            boletos: boletos
          })
        })
        .catch(err=>{
          console.log("Servidor desconectado")
          console.log(err)
        })
  }



  render(){
    const listItems = this.state.boletos.map((number) =>
      <li>{number.id_vacante}</li>
    );
    return(
      <div className="container-fluid" className="container">
        <h1>Vista del Candidato</h1>
        <input value={this.state.id} onChange={(e)=>this.setState({...this.state,id:e.target.value})}></input>
        <button type="button" onClick={this.info.bind(this,this.state.id)} className="btn btn-outline-secondary">Buscar Candidato</button>
        <p>Nombre: {this.state.nombre}</p>
        <p>Correo: {this.state.correo}</p>
        <p>Escolaridad: {this.state.escolaridad}</p>
        <p>Carrera: {this.state.carrera}</p>
        <p>Requisitos: {this.state.requisitos}</p>
        <p>ID's de las Vacantes del Candidato</p>
        {listItems}
      </div>
    )
  }

}

class RegistrarUsuario extends React.Component{
  constructor(){
    super()
    this.state={
      info:null,
      id: null,
      nombre:"",
      correo:"",
      escolaridad:"",
      carrera:"",
      requisitos:"",
    }
  }


  componentDidMount(){
    
  }


  
  async comunica(info){
    //Consumiendo el servicio POST  
    const respuesta = await fetch('http://localhost:8080/candidato/crear',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          nombre: this.state.nombre,
          correo: this.state.correo,
          escolaridad: this.state.escolaridad,
          carrera: this.state.carrera,
          requisitos: this.state.requisitos,
        })
      })
    
      //Imprimir lo que responde el servidor
      const data = await respuesta.json()
      if(data){
        this.setState({...this.state,id:data.id})
      }
      
  }

  render(){
    return(
      <div className="container-fluid" className="container">
        <h1>Pon los siguientes datos: </h1>
        <p>Nombre:</p>
        <input value={this.state.nombre} onChange={(e)=>this.setState({...this.state,nombre:e.target.value})}></input>
        <p>Correo:</p>
        <input value={this.state.correo} onChange={(e)=>this.setState({...this.state,correo:e.target.value})}></input>
        <p>Escolaridad:</p>
        <input value={this.state.escolaridad} onChange={(e)=>this.setState({...this.state,escolaridad:e.target.value})}></input>
        <p>Carrera:</p>
        <input value={this.state.carrera} onChange={(e)=>this.setState({...this.state,carrera:e.target.value})}></input>
        <p>Requisitos:</p>
        <input value={this.state.requisitos} onChange={(e)=>this.setState({...this.state,requisitos:e.target.value})}></input>
        <p></p>
        <button type="button" onClick={this.comunica.bind(this,"hola")} className="btn btn-primary">Crear Candidato</button>
        <p></p>
        <p>Tu Candidato es: {this.state.id}</p>
      </div>
    )
  }
}

class ActualizarUsuario extends React.Component{

  constructor(){
    super()
    this.state={
      estado:"",
      id: null,
      nombre:"",
      correo:"",
      dob:""
    }
  }


  componentDidMount(){
    
  }

  async conseguirDatos(info){
    fetch(`http://localhost:8080/usuario/${info}`)
      .then(res=>res.json())
        .then(datos=>{
          console.log(datos)
          this.setState({
            nombre: datos.nombre,
            correo: datos.correo,
            dob: datos.dob
          })
        })
        .catch(err=>{
          console.log("Servidor desconectado")
          console.log(err)
        })
  }


  
  async comunica(info){
    //Consumiendo el servicio POST  
    const respuesta = await fetch(`http://localhost:8080/usuario/actualizar/${this.state.id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          nombre: this.state.nombre,
          correo: this.state.correo,
          dob: this.state.dob,
        })
      })
    
      //Imprimir lo que responde el servidor
      const data = await respuesta.json()
      if(data){
        this.setState({...this.state,id:data.id})
        this.setState({...this.state,estado:data.estado.mensaje})

      }
      
  }

  render(){
    return(
      <div className="container-fluid" className="container">
        <h1>Pon los siguientes datos: </h1>
        <input value={this.state.id} onChange={(e)=>this.setState({...this.state,id:e.target.value})}></input>
        <button type="button" onClick={this.conseguirDatos.bind(this,this.state.id)} className="btn btn-outline-secondary">Buscar Usuario</button>
        <p>Nombre:</p>
        <input value={this.state.nombre} onChange={(e)=>this.setState({...this.state,nombre:e.target.value})}></input>
        <p>Correo:</p>
        <input value={this.state.correo} onChange={(e)=>this.setState({...this.state,correo:e.target.value})}></input>
        <p>Fecha de Nacimiento:</p>
        <input value={this.state.dob} onChange={(e)=>this.setState({...this.state,dob:e.target.value})}></input>
        <p></p>
        <button type="button" onClick={this.comunica.bind(this,"hola")} className="btn btn-primary">Actualizar Usuario</button>
        <p></p>
        <p>Respuesta: {this.state.estado}</p>
      </div>
    )
  }

}

class Cliente extends React.Component {

  constructor(){
    super()
    this.state={
      boletos:[],
      id: null,
      empresa:"",
      correo:"",
    }
  }

  componentDidMount(){
  }

  info(info){
    this.conseguirDatos(info)
    this.conseguirBoletos(info)
  }

  async conseguirDatos(info){
    fetch(`http://localhost:8080/cliente/${info}`)
      .then(res=>res.json())
        .then(datos=>{
          console.log(datos)
          this.setState({
            nombre: datos.nombre,
            correo: datos.correo,
          })
        })
        .catch(err=>{
          console.log("Servidor desconectado")
          console.log(err)
        })

  }


  async conseguirBoletos(info){
    fetch(`http://localhost:8080/vacante/cliente/${info}`)
      .then(res=>res.json())
        .then(boletos=>{
          console.log(boletos)
          this.setState({
            boletos: boletos
          })
        })
        .catch(err=>{
          console.log("Servidor desconectado")
          console.log(err)
        })
  }



  render(){
    const listItems = this.state.boletos.map((number) =>
      <li>{number.id}</li>
    );
    return(
      <div className="container-fluid" className="container">
        <h1>Vista del Cliente</h1>
        <input value={this.state.id} onChange={(e)=>this.setState({...this.state,id:e.target.value})}></input>
        <button type="button" onClick={this.info.bind(this,this.state.id)} className="btn btn-outline-secondary">Buscar Cliente</button>
        <p>Empresa: {this.state.empresa}</p>
        <p>Correo: {this.state.correo}</p>

        <p>ID's de las Vacantes de la Empresa</p>
        {listItems}
      </div>
    )
  }

}

class RegistrarCliente extends React.Component{
  constructor(){
    super()
    this.state={
      info:null,
      id: null,
      empresa:"",
      correo:"",
    }
  }


  componentDidMount(){
    
  }


  
  async comunica(info){
    //Consumiendo el servicio POST  
    const respuesta = await fetch('http://localhost:8080/cliente/crear',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          empresa: this.state.empresa,
          correo: this.state.correo,
        })
      })
    
      //Imprimir lo que responde el servidor
      const data = await respuesta.json()
      if(data){
        this.setState({...this.state,id:data.id})
      }
      
  }

  render(){
    return(
      <div className="container-fluid" className="container">
        <h1>Pon los siguientes datos: </h1>
        <p>Nombre de la empresa:</p>
        <input value={this.state.empresa} onChange={(e)=>this.setState({...this.state,empresa:e.target.value})}></input>
        <p>Correo:</p>
        <input value={this.state.correo} onChange={(e)=>this.setState({...this.state,correo:e.target.value})}></input>
        <p></p>
        <button type="button" onClick={this.comunica.bind(this,"hola")} className="btn btn-primary">Crear Cliente</button>
        <p></p>
        <p>Tu Cliente es: {this.state.id}</p>
      </div>
    )
  }
}

class CrearVuelo extends React.Component{

  constructor(){
    super()
    this.state={
      id: null,
      id_empresa: null,
      requisitos:"",
      remuneracion:null,
      cantidad:null,
      nombre: "",
    }
  }

  componentDidMount(){
    
  }


  
  async comunica(info){
    //Consumiendo el servicio POST  
    const respuesta = await fetch('http://localhost:8080/vacante/crear',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          idEmpresa: this.state.id_empresa,
          requisitos: this.state.requisitos,
          remuneracion: this.state.remuneracion,
          cantidad: this.state.cantidad,
          nombre: this.state.nombre,
        })
      })
    

      //Imprimir lo que responde el servidor
      const data = await respuesta.json()
      if(data){
        this.setState({...this.state,id:data.id})
      }
      
  }

  render(){
    return(
      <div className="container-fluid" className="container">
        <h1>Pon los siguientes datos: </h1>
        <p>Nombre de la Vacante: </p>
        <input value={this.state.nombre} onChange={(e)=>this.setState({...this.state,nombre:e.target.value})}></input>
        <p>Id del Cliente: </p>
        <input value={this.state.id_empresa} onChange={(e)=>this.setState({...this.state,id_empresa:e.target.value})}></input>
        <p>Requisitos:</p>
        <input value={this.state.requisitos} onChange={(e)=>this.setState({...this.state,requisitos:e.target.value})}></input>
        <p>Remuneracion:</p>
        <input value={this.state.remuneracion} onChange={(e)=>this.setState({...this.state,remuneracion:e.target.value})}></input>
        <p>Cantidad:</p>
        <input value={this.state.cantidad} onChange={(e)=>this.setState({...this.state,cantidad:e.target.value})}></input>
        <p></p>
        <button type="button" onClick={this.comunica.bind(this,"hola")} className="btn btn-primary">Crear Vacante</button>
        <p></p>
        <p>Tu Vacante es: {this.state.id}</p>
      </div>
    )
  }
}

class ActualizarVuelo extends React.Component{
  constructor(){
    super()
    this.state={
      id: null,
      estado: "",
      lugares: null,
      paisOrigen:"",
      paisDestino: "",
      horaLlegada: "",
      horaSalida: ""
    }
  }


  componentDidMount(){
    
  }

  async conseguirDatos(info){
    fetch(`http://localhost:8080/vuelo/${info}`)
      .then(res=>res.json())
        .then(datos=>{
          console.log(datos)
          this.setState({
            lugares: datos.lugares,
            paisOrigen: datos.pais_origen,
            paisDestino: datos.pais_destino,
            horaLlegada: datos.hora_llegada,
            horaSalida: datos.hora_salida
          })
        })
        .catch(err=>{
          console.log("Servidor desconectado")
          console.log(err)
        })
  }

  
  async comunica(info){
    //Consumiendo el servicio POST  
    const respuesta = await fetch(`http://localhost:8080/vuelo/actualizar/${this.state.id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          lugares: this.state.lugares,
          paisOrigen: this.state.paisOrigen,
          paisDestino: this.state.paisDestino,
          horaLlegada: this.state.horaLlegada,
          horaSalida: this.state.horaSalida
        })
      })
    
      //Imprimir lo que responde el servidor
      const data = await respuesta.json()
      if(data){
        this.setState({...this.state,id:data.id})
        this.setState({...this.state,estado:data.estado.mensaje})
      }
      
  }

  render(){
    return(
      <div className="container-fluid" className="container">
        <h1>Pon el id del vuelo: </h1>
        <input value={this.state.id} onChange={(e)=>this.setState({...this.state,id:e.target.value})}></input>
        <button type="button" onClick={this.conseguirDatos.bind(this,this.state.id)} className="btn btn-outline-secondary">Buscar Usuario</button>
        <p>lugares: </p>
        <input value={this.state.lugares} onChange={(e)=>this.setState({...this.state,lugares:e.target.value})}></input>
        <p>Pais de Origen:</p>
        <input value={this.state.paisOrigen} onChange={(e)=>this.setState({...this.state,paisOrigen:e.target.value})}></input>
        <p>Pais Destino:</p>
        <input value={this.state.paisDestino} onChange={(e)=>this.setState({...this.state,paisDestino:e.target.value})}></input>
        <p>Fecha y Hora de salida:</p>
        <input value={this.state.horaSalida} onChange={(e)=>this.setState({...this.state,horaSalida:e.target.value})}></input>
        <p>Fecha y Hora de llegada:</p>
        <input value={this.state.horaLlegada} onChange={(e)=>this.setState({...this.state,horaLlegada:e.target.value})}></input>
        <p></p>
        <button type="button" onClick={this.comunica.bind(this,"hola")} className="btn btn-primary">Actualizar Vuelo</button>
        <p></p>
        <p>Respuesta: {this.state.estado}</p>
      </div>
    )
  }
  
}

class Vuelo extends React.Component{
  constructor(){
    super()
    this.state={
      id: null,
      id_empresa: null,
      requisitos:"",
      remuneracion:null,
      cantidad:null,
      nombre:"",
      boletos: [],
    }
  }

  componentDidMount(){
  }

  info(info){
    this.conseguirDatos(info)
    this.conseguirBoletos(info)
  }

  async conseguirDatos(info){
    fetch(`http://localhost:8080/vacante/${info}`)
      .then(res=>res.json())
        .then(datos=>{
          console.log(datos)
          this.setState({
            id_empresa: datos.id_empresa,
            requisitos: datos.requisitos,
            remuneracion: datos.remuneracion,
            cantidad: datos.cantidad,
            nombre: datos.nombre,
          })
        })
        .catch(err=>{
          console.log("Servidor desconectado")
          console.log(err)
        })
  }


  async conseguirBoletos(info){
    fetch(`http://localhost:8080/vacantecandidato/vacante/${info}`)
      .then(res=>res.json())
        .then(boletos=>{
          this.setState({
            boletos: boletos
          })
        })
        .catch(err=>{
          console.log("Servidor desconectado")
          console.log(err)
        })
  }



  render(){
    const listItems = this.state.boletos.map((number) =>
      <li>{number.id_candidato}</li>
    );
    return(
      <div className="container-fluid" className="container">
        <h1>Vista del Vacante</h1>
        <input value={this.state.id} onChange={(e)=>this.setState({...this.state,id:e.target.value})}></input>
        <button type="button" onClick={this.info.bind(this,this.state.id)} className="btn btn-outline-secondary">Buscar Vacante</button>
        <p>Nombre de la Vacante: {this.state.nombre}</p>
        <p>Id del Cliente: {this.state.id_empresa}</p>
        <p>Requisitos: {this.state.requisitos}</p>
        <p>Remuneracion: {this.state.remuneracion}</p>
        <p>Cantidad: {this.state.cantidad}</p>

        <p>ID's de los Candidatos en la Vacante</p>
        {listItems}
      </div>
    )
  }
}

class CrearBoleto extends React.Component{
  constructor(){
    super()
    this.state={
      id_usuario: null,
      id_vuelo: null,
      estado: ""
    }
  }

  async comunica(info){
    //Consumiendo el servicio POST  
    const respuesta = await fetch('http://localhost:8080/vacantecandidato/crear',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          idVacante: this.state.id_vuelo,
          idCandidato: this.state.id_usuario,
        })
      })
    
      //Imprimir lo que responde el servidor
      const data = await respuesta.json()
      if(data){
        this.setState({...this.state,estado:data.estado.mensaje})
      }
      
  }

  render(){
    return(
      <div className="container-fluid" className="container">
        <h1>Pon los siguientes datos: </h1>
        <p>Id Candidato:</p>
        <input value={this.state.id_usuario} onChange={(e)=>this.setState({...this.state,id_usuario:e.target.value})}></input>
        <p>Id Vacante:</p>
        <input value={this.state.id_vuelo} onChange={(e)=>this.setState({...this.state,id_vuelo:e.target.value})}></input>
        <p></p>
        <button type="button" onClick={this.comunica.bind(this,"hola")} className="btn btn-primary">Asignar Vacante</button>
        <p></p>
        <p>Respuesta: {this.state.estado}</p>
      </div>
    )
  }
}

class EliminarBoleto extends React.Component{
  constructor(){
    super()
    this.state={
      id_usuario: null,
      id_vuelo: null,
      estado: ""
    }
  }

  async comunica(info){
    //Consumiendo el servicio POST  
    const respuesta = await fetch('http://localhost:8080/boleto/eliminar',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          idVuelo: this.state.id_vuelo,
          idUsuario: this.state.id_usuario,
        })
      })
    
      //Imprimir lo que responde el servidor
      const data = await respuesta.json()
      if(data){
        this.setState({...this.state,estado:data.estado.mensaje})
      }
      
  }

  render(){
    return(
      <div className="container-fluid" className="container">
        <h1>Pon los siguientes datos: </h1>
        <p>Id Usuario:</p>
        <input value={this.state.nombre} onChange={(e)=>this.setState({...this.state,id_usuario:e.target.value})}></input>
        <p>Id Vuelo:</p>
        <input value={this.state.correo} onChange={(e)=>this.setState({...this.state,id_vuelo:e.target.value})}></input>
        <p></p>
        <button type="button" onClick={this.comunica.bind(this,"hola")} className="btn btn-primary">Eliminar Boleto</button>
        <p></p>
        <p>Respuesta: {this.state.estado}</p>
      </div>
    )
  }
}




function App() {
  return (
    <div className="App">
        <h1>Proyecto Trabajo</h1>
        <Encabezado/>
        <Routes>
            <Route path="/" element={<Menu/>}>
              <Route index element={<Home/>}/>
            </Route>
            <Route path="/candidato" element={<MenuUsuario/>}>
              <Route path="info" element={<Usuario/>}/>
              <Route path="registrar" element={<RegistrarUsuario/>}/>
            </Route>
            <Route path="/cliente" element={<MenuCliente/>}>
              <Route path="info" element={<Cliente/>}/>
              <Route path="registrar" element={<RegistrarCliente/>}/>
            </Route>
            <Route path="/vacante" element={<MenuVuelo/>}>
              <Route path="info" element={<Vuelo/>}/>
              <Route path="crearvacante" element={<CrearVuelo/>}/>
            </Route>
            <Route path="/vacantecandidato" element={<MenuBoleto/>}>
              <Route path="asignarvacante" element={<CrearBoleto/>}/>
            </Route>

            <Route path="*" element={<Error404/>}/>
        </Routes>
    </div>
  );
}


export default App;