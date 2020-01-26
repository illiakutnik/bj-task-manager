import axios from 'axios'
import history from '../utils/history'

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
} from './types'

const url = 'https://uxcandy.com/~shapoval/test-task-backend/v2'
const dev = '?developer=Illia'

export const getTasks = (
	sort_field = 'id',
	sort_direction = 'desc',
	page
) => async dispatch => {
	try {
		const res = await axios.get(
			`${url}/${dev}&sort_field=${sort_field}&sort_direction=${sort_direction}&page=${page}`
		)
		if (res.data.status === 'error') {
			dispatch({
				type: GET_TASKS_FAIL,
				payload: res.data.message
			})
		}
		dispatch({
			type: GET_TASKS,
			payload: res.data.message
		})
	} catch (err) {
		dispatch({
			type: GET_TASKS_FAIL,
			payload: err.message
		})
	}
}

export const addTask = formData => async dispatch => {
	try {
		const res = await axios.post(`${url}/create${dev}`, formData)
		if (res.data.status === 'error') {
			dispatch({
				type: ADD_TASK_FAIL,
				payload: Object.entries(res.data.message)
			})
		}
		dispatch({ type: ADD_TASK })
	} catch (err) {
		dispatch({
			type: ADD_TASK_FAIL,
			payload: err.message
		})
	}
}

export const login = formData => async dispatch => {
	try {
		const res = await axios.post(`${url}/login${dev}`, formData)
		if (res.data.status === 'ok') {
			dispatch({
				type: LOGIN,
				payload: res.data.message.token
			})
			localStorage.setItem('token', res.data.message.token)
			history.push('/')
		}
		if (res.data.status === 'error') {
			dispatch({
				type: LOGIN_FAIL,
				payload: Object.entries(res.data.message)
			})
		}
	} catch (err) {
		dispatch({
			type: LOGIN_FAIL,
			payload: err.message
		})
	}
}

export const logout = () => {
	return { type: LOGOUT }
}

export const editTask = (id, editFields) => async dispatch => {
	try {
		const res = await axios.post(`${url}/edit/${id}${dev}`, editFields)
		if (res.data.status === 'ok') {
			dispatch({
				type: EDIT_TASK
			})
		}
		if (res.data.status === 'error') {
			dispatch({
				type: EDIT_TASK_FAIL,
				payload: Object.entries(res.data.message)
			})
		}
	} catch (err) {
		dispatch({
			type: EDIT_TASK_FAIL,
			payload: err.message
		})
	}
}
