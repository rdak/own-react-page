import React from 'react';
import logo from '../logo.svg';
import axios from 'axios';

class RedditData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    };

    componentWillReceiveProps(nextProps) {
        axios.get(`http://www.reddit.com/r/${nextProps.subreddit}.json`)
            .then(res => {
                let posts = res.data.data.children.map(obj => <li key={obj.data.id}>{obj.data.title}</li>);
                this.setState({ posts });
            });
    };

    componentDidMount() {
        axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
            .then(res => {
                let posts = res.data.data.children.map(obj => <li key={obj.data.id}>{obj.data.title}</li>);
                this.setState({ posts });
            });
    };

    render() {
        return (
            <div className="redditData">
                <h1>{`/r/${this.props.subreddit}`}</h1>
                <ul>
                    { this.state.posts }
                </ul>
            </div>
        );
    };
};

class GitHubData extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            name : null,
            loaded : false,
            requestFailed : false
        };
    };

    componentWillReceiveProps(nextProps){
        const url = 'https://api.github.com/users/' + nextProps.githubuser;
        fetch(url)
            .then(response => {
                if (!response.ok){
                    throw Error('Can not connect');
                }
                return response;
            })
            .then(res => res.json())
            .then(res => {
                    this.setState({
                        name : res.name,
                        loaded : true,
                        requestFailed : false
                    });
                }, (e) => {
                    console.log(e);
                    this.setState({
                        requestFailed : true
                    });
                }
            );
    }

    componentDidMount() {
        const url = 'https://api.github.com/users/' + this.props.githubuser;
        fetch(url)
            .then(response => {
                if (!response.ok){
                    throw Error('Can not connect');
                }
                return response;
            })
            .then(res => res.json())
            .then(res => {
                    this.setState({
                        name : res.name,
                        loaded : true,
                        requestFailed : false
                    });
                }, (e) => {
                    console.log(e);
                    this.setState({
                        requestFailed : true
                    });
                }
            );
    };

    render(){
        if (this.state.requestFailed) {
            return <div className="gitHubData"><p>Sorry, request was Failed</p></div>;
        }

        if (!this.state.loaded) {
            return <div className="gitHubData"><p>Loading...</p></div>;
        }
        else {
            return (
                <div className="gitHubData">
                    <p className="gitHubData__name">
                        { this.state.name }
                    </p>
                    {this.props.children}
                </div>
            );
        }
    };
};

class GitHubProjects extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            loaded : false,
        };
    };

    componentWillReceiveProps(nextProps){
        const url = 'https://api.github.com/users/' + nextProps.githubuser + '/repos';
        fetch(url)
            .then(res => res.json())
            .then(res => {
                    let projects = res.map(obj => <li key={obj.id}><a href="{obj.html_url}" target="_blank">{obj.name}</a></li>);
                    this.setState({projects});
                }
            );
    }

    componentDidMount(){
        const url = 'https://api.github.com/users/' + this.props.githubuser + '/repos';
        fetch(url)
            .then(res => res.json())
            .then(res => {
                    let projects = res.map(obj => <li key={obj.id}><a href="{obj.html_url}" target="_blank">{obj.name}</a></li>);
                    this.setState({projects});
                }
            );
    };

    render(){
        return(
            <ul className="gitHubData__projects">
                { this.state.projects }
            </ul>
        );
    };
};

class SearchPanel extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            filterText : this.props.filterText
        };

        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    
    handleFilterTextInput(e) {
        this.setState({
            filterText : e.target.value
        });
    }

    handleBlur(e){
        console.log(e.target.value);
        this.props.handleFilter(e.target.value);
    }
    
    render(){
        return (
            <div className="search-panel">
                <label>
                    <span>Enter {this.props.nameValue}</span>
                    <input
                        type="text"
                        placeholder={this.props.placeholder}
                        value={this.state.filterText}
                        onChange={this.handleFilterTextInput}
                        onBlur={this.handleBlur}
                    />
                </label>
            </div>
        );
    };
}

class GetData extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            githubuser : '',
            subreddit : ''
        };

        this.handleRedditFilter = this.handleRedditFilter.bind(this);
        this.handleGitHubFilter = this.handleGitHubFilter.bind(this);
    }

    handleRedditFilter(subreddit){
        this.setState({ subreddit : subreddit });
    }

    handleGitHubFilter(githubuser){
        this.setState({ githubuser : githubuser });
    }

	render(){
        let subreddit = this.state.subreddit ? this.state.subreddit : 'reactjs';
        let githubuser = this.state.githubuser ? this.state.githubuser : 'rdak';

		return (
            <div className="body-page">
    			<div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>GetData Page</h2>
                </div>
                <div className="container">
                    <div className="inputs">
                        <SearchPanel 
                            handleFilter={this.handleRedditFilter}
                            filterText={subreddit}
                            nameValue="subreddit"
                            placeholder="reactjs"
                        />
                        <SearchPanel
                            handleFilter={this.handleGitHubFilter}
                            filterText={githubuser}
                            nameValue="githubuser"
                            placeholder="rdak"
                        />
                        <div className="hint">
                            Use onBlur event if you want update the data(button is not ready)
                        </div>
                    </div>
                    <div className="fetchData">
                        <RedditData subreddit={subreddit} />
                        <GitHubData githubuser={githubuser}>
                            <GitHubProjects githubuser={githubuser} />
                        </GitHubData>
                    </div>
                </div>
            </div>
		);
	};
};

export default GetData;