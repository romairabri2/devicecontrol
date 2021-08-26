import React, { Component } from 'react';
/*import ReactDOM from "react-dom";*/
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

//IMPORTAR COMPONENTES
import Error from './components/Error';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Settings from './components/Settings';
import Search from './components/Search';
import CreateDevice from './components/CreateDevice';
import EditDevice from './components/EditDevice';
import DeviceConfig from './components/DeviceConfig';

class Router extends Component {

    render() {

        return (
            <BrowserRouter>
                <Header />
                
                    {/*CONFIGURACION DE RUTAS Y PAGINAS*/}
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/device/new" component={CreateDevice} />
                        <Route exact path="/device/edit/:id" component={EditDevice} />
                        <Route exact path="/device/search/:search" component={Search} />
                        <Route exact path="/config/device/:id" component={DeviceConfig} />
                        <Route exact path="/config" component={Settings} />
                        <Route exact path="/redirect/:search" render={
                            (props) => {
                                var search = props.match.params.search;
                                return (
                                    <Redirect to={'/device/search/'+search}/>
                                );
                            }
                        }/>
                    
                        <Route component={Error} />
                    </Switch>
                    <div className="clearfix"></div>
                <Footer />
            </BrowserRouter>
        );
    }
}

export default Router;