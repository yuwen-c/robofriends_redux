//import React from 'react';
import React, {Component} from 'react';

class ErrorBoundary extends Component{
	constructor(props){
		super(props);
		this.state = {
			hasError: false
		};
	}

	componentDidCatch(error, info){
		this.setState({hasError: true});
		// logErrorToMyService(error, info,'test');???
	}

	render(){
		if (this.state.hasError){
			return <h1>Oh no, something bad happened!</h1>;
		}
		else{
			return this.props.children;
		}
	}
}

export default ErrorBoundary;