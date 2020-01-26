import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from '../reducer'

const initialState = {
	tasks: [],
	adminToken: localStorage.getItem('token'),
	isLoading: true,
	error: null
}

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(thunk))
)

export default store
