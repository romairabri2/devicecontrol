import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import DeviceConfiguration from './DeviceConfiguration';

class Settings extends Component {

    render() {

        return (
            <div id="blog">
                <Slider
                    title="Control Panel"
                    size="slider-small"
                />
                <div className="center">
                    <div id="content">
                       <DeviceConfiguration/>
                    </div>
                    <Sidebar
                        blog="true"
                    />
                </div>
            </div>
        );
    }
}

export default Settings;