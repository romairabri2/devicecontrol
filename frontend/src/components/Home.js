import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Devices from './Devices';

class Home extends Component {

    render() {

        return (
            <div id="home">
                <Slider
                    title="Smart Home Security Systems"
                    size="slider-small"
                />
                <div className="center">
                    <div id="content">
                        <Devices/>      
                    </div>

                    <Sidebar
                    />
                </div>
            </div>
        );
    }
}

export default Home;