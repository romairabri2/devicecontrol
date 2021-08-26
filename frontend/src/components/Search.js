import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Devices from './Devices';

class Search extends Component {

    render() {
        var searched = this.props.match.params.search;

        return (
            <div id="blog">
                <Slider
                    title={'Búsqueda: ' + searched}
                    size="slider-small"
                />
                <div className="center">
                    <div id="content">
                        <Devices
                            search = {searched}/>      
                    </div>

                    <Sidebar
                        blog="true"
                    />
                </div>
            </div>
        );
    }
}

export default Search;