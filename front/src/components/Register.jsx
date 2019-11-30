import React    from "react";
import {register} from "../Api";
import {addPet} from "../Api";
import {getPets} from "../Api";
import {getClients} from "../Api";
import                  '../css/loginStyles.css';
import                  '../css/popupStyeles.css';
import Pet from "./Pet.jsx"

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

        this.togglePopup = this.togglePopup.bind(this);   

        this.changeNameAnimal = this.changeNameAnimal.bind(this);
        this.changeNotes = this.changeNotes.bind(this);
        this.changeDniOwner = this.changeDniOwner.bind(this)

        
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
   renderPets(){
        return((pets) =>      
                        <li key={pets.code}>
                            <div color = 'white'>{pets.petName}</div>
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
            
        );
    }
}
