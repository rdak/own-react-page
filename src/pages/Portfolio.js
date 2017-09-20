import React from 'react';
import logo from '../logo.svg';

class Portfolio extends React.Component{
	render(){
		return (
            <div className="body-page">
    			<div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Portfolio Page</h2>
                </div>
                <p className="App-intro">
                    There are a lot of articles below.
                </p>
            </div>
		);
	};
};

export default Portfolio;