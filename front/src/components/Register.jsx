import React    from "react";
import {register} from "../Api";
import {addPet} from "../Api";
import {getPets} from "../Api";
import {getClients} from "../Api";
import {getClientByDni} from "../Api";
import                  '../css/loginStyles.css';
import                  '../css/popupStyeles.css';
import                  '../css/popupStyleClient.css';
import                '../css/navStyles.css';
import Pet from "./Pet.jsx"
import { Redirect } from 'react-router-dom'

/************************************ Componente PopUp *************************************/


class Popup extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    {this.props.form}
                </div>
            </div>
        );
        }
  }


  /**************************************Componente PopUp de Clientes***************************************************/

  class PopupClient extends React.Component {

    constructor(props){
        super(props);
        this.state={
            toHome:false,
        }
        
    }
    render() {

        if (this.state.toHome){
            return <Redirect to={{
              pathname: '/',
              state: { dni: this.state.dni  }}}/>
            
        }


        return (
            <div className='popup'>
                <div className='popup_inner'>
                    {this.props.formClient}
                </div>
            </div>
        );
        }
  }


  /***********************************************************************************************/

export default class Register  extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
                firstName: '',
                lastName: '',
                dni:'',
                tel: '',
                address: '',
                mail:'',
                pets: [],
                clients: [],
                showPopUpClient:false,
                showPopup: false,
                petName: '',
                notes: '',
                search: '',
                messageClient: '',
                messagePet: '',
                searchPets: false
                    };
        
        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changeDni = this.changeDni.bind(this);
        this.changeTel = this.changeTel.bind(this);
        this.changeAddress = this.changeAddress.bind(this);
        this.changeMail = this.changeMail.bind(this);
        this.registerClient = this.registerClient.bind(this)
        
        this.togglePopupClient = this.togglePopupClient.bind(this);   
        this.togglePopup = this.togglePopup.bind(this);   

        this.changeNameAnimal = this.changeNameAnimal.bind(this);
        this.changeNotes = this.changeNotes.bind(this);
        this.changeDniOwner = this.changeDniOwner.bind(this)
        this.changeSearch = this.changeSearch.bind(this);
        
        
    }
    changeFirstName(event){
        this.setState( {firstName: event.target.value} )        
    }
    changeLastName(event){
        this.setState( {lastName: event.target.value} )
    }
    changeDni(event){
        this.setState( {dni: event.target.value} )
    }
    changeTel(event){
        this.setState( {tel: event.target.value} )
    }
    changeAddress(event){
        this.setState( {address: event.target.value} )
    }
    changeMail(event){
        this.setState( {mail: event.target.value} )
    }
    changeNameAnimal(event){
        this.setState( {petName: event.target.value} )
    }
    changeDniOwner(event){
        this.setState( {dni: event.target.value} )
    }
    changeNotes(event){
        this.setState( {notes: event.target.value} )
    }


    changeSearch(event){
        this.setState( {search: event.target.value} )
    }

    registerClient() {
          const body = {
            dni : this.state.dni,
            name: this.state.firstName,
            surname: this.state.lastName,
            address: this.state.address,
            email: this.state.mail,
            telephone: this.state.tel,
          };
          if (this.state.dni === "" || this.state.firstName === "" || this.state.lastName === ""
                || this.state.address === "" || this.state.mail === "" || this.state.tel === ""){
                    this.setState({ messageClient: 'Falta cargar algún dato' });
          }                
            else{
                register(body)
                    .then(() => this.setState({ messageClient: 'Cliente registrado exitosamente' }))
                    .catch(() => this.setState({ messageCliente: 'No se pudo registrar el cliente' }));  
            }
        }
    getMessage(value){
        var r;
        value ? r = this.state.messageClient : r = this.state.messagePet;
        return r;
    }
      
    addPets(){
        const body = {
            petName: this.state.petName,
            ownerDni: this.state.dni,
            notes: this.state.notes,
        };
        if (this.state.petName === "" || this.state.ownerDni === ""){
            this.setState({ messagePet: 'Falta cargar algún dato' });
        }else{
        addPet(body)
            .then(this.setState({messagePet: 'Mascota registrada exitosamente'}))                  
            .catch(() => this.setState({ messagePet: 'No se pudo registrar la mascota' })); 
        }
    }
    getAllPets(){
        getPets(this.state.dni)
                    .then(result => { this.setState({pets: result})})
                    .catch(() => this.setState({ messagePet: 'No se pudo registrar la mascota' })); 
    }
    
    getAllClients(){
        getClients(this.state.search)
                    .then(result => { this.setState({clients: result})})
                    .catch(() => this.setState({ messageClient: 'Fallo la busqueda' })); 
    }

    getClient(dni){
        getClientByDni(dni)
                    .then(result => {this.setState({firstName: result.name, 
                                                    lastName: result.surname,
                                                    address: result.address,
                                                    tel: result.telephone,
                                                    mail:result.email})})
                    .catch(); 
    }    
    
    /********************************* Manipulación del Pop-Up ********************************/

    createContentPopUp(){
        return (
            <div className=''>
              {this.state.showPopup ? 
                <Popup
                  form={this.createRegistrationPet()}
                />
                : null
              }
            </div>
          );
    }
    createContentPopUpClient(){     
        return (
            <div className=''>
              {this.state.showPopUpClient ? 
                <PopupClient
                formClient={this.createRegistrationClient()}
                />
                : null
              }
            </div>
        );
    }

    selectClient(document){
        this.togglePopupClient()
        this.setState( {dni: document})
        this.getClient(document)
        this.getAllPets()
    }

    createSearchListClient(){
        return( 
            this.state.clients.map( (client) => (   
                    
                        <div key={client.dni} className="row">
                            <div className="elementRow">{client.dni}</div>
                            <div className="elementRow">{client.name}</div>
                            <div className="elementRow">{client.surname}</div>
                            <div className="containerVer">
                                <button className="ver" type = "button"  onClick ={ () => this.selectClient(client.dni) }>Ver </button>
                            </div>
                        </div>
                       
                    ))
        )
    }

    createCancelationClient(){
        return (<div className="cancelarClient">
        <button  type = "button" className="addPet"  onClick ={ () => this.togglePopupClient() }>Cancelar </button></div>)
    }

    createHeaderTable(){
        return (
            <div>
                <p className="nuevaMascota">Clientes</p>
                <div className="row rowHeader">
                    <p className="elementRow elementHeader">DNI</p>
                    <p className="elementRow elementHeader">NOMBRE</p>
                    <p className="elementRow elementHeader">APELLIDO</p>
                </div>
            </div>
        )
    }

    createRegistrationClient(){
        return(
      <div>{this.createHeaderTable()}  {this.createSearchListClient()}  {this.createCancelationClient()}</div>
        )
    }

    createRegistrationPet(){
        return (
            <div>
                <form className="formPet">
                    <p className="nuevaMascota">Nueva mascota</p>
                    <div className="rowfilds">
                        <input type="text" name="namePet" className="fieldForm fieldPet" placeholder="Nombre del animal" value={this.state.petName} onChange={this.changeNameAnimal}/>                     
                        <input type="text" name ="lastName" className = "fieldForm fieldPet"  placeholder="DNI del dueño" value={this.state.dni} onChange={this.changeDniOwner}/>      
                    </div>
                    <textarea className="notes fieldPet" name="notes" rows="8" cols="50" placeholder="Historia clínica" onChange={this.changeNotes}></textarea> 
                    <div className="rowfilds">
                        <button className = "savePet" onClick={() => {this.togglePopup();if (this.state.dni!=0){this.getAllPets();}}}>CANCELAR</button>
                        <button type = "button" className = "savePet" onClick ={ () => this.addPets() }>GUARDAR </button>
                    </div>
                    <p className="message">{this.getMessage(false)}</p>
                </form>
            </div>
        );
    }
   
    togglePopup(event) {
        this.setState({ showPopup: event, messagePet: ''});
   }
   
   togglePopupClient(event) {
        this.setState({ showPopUpClient: event, messageClient: ''});
    }

   renderPets(){
        return((pets) =>      
                        <li key={pets.code}>
                            <div>{pets.petName}</div>
                            <div>{pets.notes}</div>
                        </li>)
   }

    /**********************************************************************************************/

    render(){       
      
      const mappingPets = (pet) => (<Pet key = {pet.code}
        petName = {pet.petName}
        petNotes = {pet.notes}
        petCode = {pet.code}
         />)

        return(
            <div>

                <div className="containerNav">
                    <div className="rowBuscar">
                        <input type="text" name="search" className="inputBuscar"  value={this.state.search} onChange={this.changeSearch} placeholder="Buscar"/>                     
                        <button type="button" className="buscarClient" onClick={() => {this.getAllClients();if (this.state.clients.length) {this.togglePopupClient(!this.state.showPopUpClient); }}}>BUSCAR</button>
                        {this.createContentPopUpClient()}
                    </div>
                </div>

                <div className="containerForm">
                    <form  className="formRegister">
                        <p className="titleForm">Registrar cliente</p>
                        <div className="rowfilds">
                            <input type="text" name="firstName" className="fieldForm"  value={this.state.firstName} onChange={this.changeFirstName} placeholder="Nombre"/>                     
                            <input type="text" name ="lastName" className = "fieldForm"  value={this.state.lastName} onChange={this.changeLastName} placeholder="Apellido"/>          
                        </div>
                        <div className="rowfilds">
                            <input type="text" name ="dni"  className="fieldForm" value={this.state.dni} onChange={this.changeDni} placeholder="DNI"/> 
                            <input type="text" name ="tel" className="fieldForm" value={this.state.tel} onChange={this.changeTel} placeholder="Tel."/>
                            </div>
                        <div className="rowfilds">
                            <input type="text" name ="address" className="fieldForm" value={this.state.address} onChange={this.changeAddress} placeholder="Domicilio"/>
                            <input type="text" name ="mail" className="fieldForm" value={this.state.mail} onChange={this.changeMail} placeholder="Mail"/>
                        </div>
                        {/* <p className="message">{this.getMessage(true)}</p> */}
                        <button type = "button" className = "addPet registrar" onClick={ this.registerClient }>REGISTRAR </button>
                        <p className="titleForm mascotas">Mascotas</p>
                        <div className="containerPet">
                           
                                <ul className="listPets">
                                    {this.state.pets.map(mappingPets)}
                                </ul>
                           
                            {this.createContentPopUp()}
                        </div>
                        <button type="button" className="addPet" onClick={() => this.togglePopup(!this.state.showPopup)}>AGREGAR</button>
                               
                        <p className="message">{this.getMessage(true)}</p>
                    </form>
                </div>
            </div>
        );
    }
}
