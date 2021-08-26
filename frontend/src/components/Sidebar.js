import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Sidebar extends Component{

    searchRef = React.createRef();

    state = {
        search: "",
        redirect: false
    };

    redirectToSearch = (e) => {
        e.preventDefault();
        
        this.setState({
            search: this.searchRef.current.value,
            redirect: true
        });
    }

    render() {

        if(this.state.redirect){
            return (
                <Redirect to={'/redirect/'+this.state.search} />
            );
        }
        
        return (
            <aside id="sidebar">
                
                    <div id="nav-blog" className="sidebar-item">
                        <Link to={'/device/new'} className="btn btn-success">Add device</Link>
                    </div>
               { this.props.blog !== "true" &&
                <div id="search" className="sidebar-item">   
                        <p>Search for devices</p>
                        <form onSubmit={this.redirectToSearch}>
                            <input type="text" name="search" ref={this.searchRef}/>
                            <input type="submit" name="submit" value="Buscar" className="btn btn-secondary" />
                        </form>
                </div>
                }
            </aside>
            
        );
    }
}

export default Sidebar;