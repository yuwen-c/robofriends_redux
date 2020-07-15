import React from 'react';
import { connect } from 'react-redux';
import CardList from '../component/CardList.js';
//import {robots} from '../component/robots.js';
import SearchBox from '../component/SearchBox';
import './App.css';
import Scroll from '../component/Scroll.js';
import ErrorBoundary from '../component/ErrorBoundary.js';
import { setSearchField, fetchRobots } from '../actions';

// since in index.js, we createStore from reducer-searchRobots,
// now we pass this state as props (a prop object) to App.
// this state comes from the return of reducer
const mapStateToProps = (state) =>{
	return {
		searchField: state.searchRobots.searchField, 
		robots: state.loadRobots.robots,
		isPending: state.loadRobots.isPending,
		error: state.loadRobots.error
	}
}

// dispatch is used for sending actions to reducer.
// we're going to use this dispatch to let the input change can be passed
// it'll be passes as a props
// here the prop onSearchChange is a prop name, and it's also a function.

// this function will receive dispatch: trigger the action(the obj we've created)
// and we use dispatch to send action to reducer
const mapDispatchToProps = (dispatch) => {
	return{ // return an obj:  a prop that App will receive
		// a function that replace onSearchChange to update searchfield state
		// receive an event, dispatch the action to reducer. this action listens to the changes
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		// a function that replace componentDidMount to load robots
		// the action - fetchRobots not returns an obj, but a function with a dispatch method
		onRequestRobots: () => fetchRobots(dispatch)
		// can be also write like this:
		// onRequestRobots: () => dispatch(fetchRobots()) 
	}
}



// to use state syntax, a class is required.
class App extends React.Component {
	// constructor(){   
	// 	super()    // before this, super() is called.
	// 	this.state = {
	// 		robots: [] // in real world, we get data from server instead of importing a file
	// 		// searchfield:''
	// 	}
	// }

	// onSearchChange = (event) => {
	// 	this.setState({ searchfield: event.target.value});
	// }

	componentDidMount(){ 
		this.props.onRequestRobots(); // a function here
		// fetch is a method of window object, it allows us to make requests to server.
		// fetch('https://jsonplaceholder.typicode.com/users') // go to this url and get data
		// 	.then(response => {	return response.json();})
		// 	.then(users => {this.setState({robots: users})})  //update state
		 }
	render(){      
		// const {robots} = this.state;  // for short writing, not repeating this.state
		const { searchField, robots, onSearchChange, isPending} = this.props;
		const filteredRobots = robots.filter((robot) => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase())
		}) 
		// if data is so huge, we can use a if statement, then the original empty [] shows loading.
		// after this.setState, robots will show.
		if (isPending){
			return(<h1 className='tc'>Loading....</h1>)
		}
		else{
		return(	
			<div className="tc">
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={onSearchChange}/>	
				{/*  anytime when the searchbox changes, it triggers the searchChange function.
				 */}
				<Scroll>
					<ErrorBoundary>
						<CardList robots={filteredRobots}/> { /*CardLists receives robots from state*/}
					</ErrorBoundary>
				</Scroll>
			</div>
		) 
		} 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

// use connect function to let App know: 
// which state change it's going to watch, which action it's interesting with