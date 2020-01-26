import {
	GET_TASKS,
	GET_TASKS_FAIL,
	ADD_TASK,
	ADD_TASK_FAIL,
	LOGIN,
	LOGIN_FAIL,
	LOGOUT,
	EDIT_TASK,
	EDIT_TASK_FAIL
} from '../actions/types'

const initialState = {}

export default function(state = initialState, action) {
	const { type, payload } = action
	switch (type) {
		case GET_TASKS:
			return { ...state, tasks: payload, isLoading: false, error: null }
		case GET_TASKS_FAIL:
			return { ...state, error: payload }
		case ADD_TASK:
			return { ...state, error: false, isLoading: false }
		case ADD_TASK_FAIL:
			return { ...state, error: payload }
		case LOGIN:
			localStorage.setItem('token', payload)
			return { ...state, adminToken: payload, error: null }
		case LOGIN_FAIL:
			return { ...state, error: payload }
		case LOGOUT:
			localStorage.removeItem('token')
			return { ...state, adminToken: null }
		case EDIT_TASK:
			return { ...state, error: false, isLoading: false }
		case EDIT_TASK_FAIL:
			return { ...state, error: payload }
		default:
			return state
	}
}
