import React          from 'react';
import { withRouter } from 'react-router';
import                '../css/navStyles.css';
import {getClients} from "../Api";

class Nav extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text: ''
           
        }
    
    }


    //que ell texto que se muestra sea dinamico dependiendo de la pagina en la que se encuentra

    render() {
        return (
            <div className="containerNav">
              <div>
                <p className="titleNav">ADMINISTRACIÓN DE REGISTROS</p>
                    <br/> 
                 </div> 
            </div>
        );
    }
}

export default withRouter(Nav);