import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './utils/store'
import history from './utils/history'
import Navbar from './components/Navbar'
import List from './components/List/List'
import Create from './components/Create'
import Login from './components/Login'

const App = () => {
	return (
		<Provider store={store}>
			<Router history={history}>
				<>
					<Navbar />
					<Switch>
						<Route exact path='/' component={List} />
						<Route exact path='/create' component={Create} />
						<Route exact path='/login' component={Login} />
					</Switch>
				</>
			</Router>
		</Provider>
	)
}

export default App
