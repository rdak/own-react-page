import React, { Component } from 'react';
import Header from './partials/Header.js';
import Homepage from './pages/Homepage.js';
import Blog from './pages/Blog.js';
import Portfolio from './pages/Portfolio.js';
import Contact from './pages/Contact.js';

import './style/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: window.location.pathname,
        };
      
        this.handleHeaderClick = this.handleHeaderClick.bind(this);
    }

    handleHeaderClick(pathname){
        var state = { 'page_id': pathname };
        var title = pathname;
        var url = pathname;
        window.history.pushState(state, title, url);

        this.setState({ currentPage : pathname });
    }

    render() {
        let currentPage = this.state.currentPage;

        let page = <Homepage />;
        if (currentPage == '/' || currentPage == '/home') {
        }
        else if (currentPage == '/blog'){
            page = <Blog />;
        }
        else if (currentPage == '/portfolio'){
            page = <Portfolio />;
        }
        else if (currentPage == '/contact'){
            page = <Contact />;
        }

        return (
            <div className="App">
                <Header
                    currentPage={this.state.currentPage}
                    handleHeaderClick={this.handleHeaderClick}
                />
                {page}
            </div>
        );
    }
}

export default App;
