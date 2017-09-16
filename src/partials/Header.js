import React from 'react';

class Header extends React.Component {
	constructor(props){
      	super(props);
      	this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
    	e.preventDefault();
      	this.props.handleHeaderClick(e.target.getAttribute('href'));
    }

  	render() {
    	const pages = [
    		{
    			href : '/',
    			name : 'Главная',
    		},
    		{
    			href : '/blog',
    			name : 'Блог',
    		},
    		{
    			href : '/portfolio',
    			name : 'Портфолио',
    		},
    		{
    			href : '/contact',
    			name : 'Контакты',
    		},
    	];

    	const navLinks = pages.map(page => {
    		let active = '';
    		console.log(this.props);
    		if (this.props.currentPage == page.href){
    			active = ' header__menu-point--active';
    		}

    		let className = "header__menu-point" + active;

      		return (
      			<li className={className} key={page.name}>
	        		<a href={page.href} onClick={this.handleClick}>
	          			{page.name}
	        		</a>
        		</li>
		    )
    	});

	    return (
	    	<div className="header">
	    		<div className="header__logo">
	    			<a href="/" onClick={this.handleClick}>Vsevolod Chebykin</a>
	    		</div>
	    		<ul className="header__menu">
	    			{navLinks}
				</ul>
	    	</div>
    	);
  	}
}

export default Header;