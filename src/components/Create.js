import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addTask } from '../actions'

const Create = ({ addTask, error, isLoading }) => {
	
	const [values, setValues] = useState({
		name: '',
		email: '',
		text: ''
	})

	const handleChange = event => {
		setValues({
			...values,
			[event.target.name]: event.target.value
		})
	}

	const handleSubmit = event => {
		event.preventDefault()
		let newTask = new FormData()
		newTask.append('username', values.name)
		newTask.append('email', values.email)
		newTask.append('text', values.text)
		addTask(newTask)
		setValues({
			name: '',
			email: '',
			text: ''
		})
	}

	return (
		<div style={style.posWrapper}>
			<div style={style.wrapper}>
				<h2>Add task</h2>
				<form onSubmit={handleSubmit} style={style.form}>
					<input
						style={style.input}
						name='name'
						value={values.name}
						type='text'
						placeholder='Name'
						onChange={handleChange}
						required
					/>
					<input
						style={style.input}
						name='email'
						value={values.email}
						type='email'
						placeholder='Email'
						onChange={handleChange}
						required
					/>
					<textarea
						style={{ ...style.input, ...style.inputText }}
						name='text'
						value={values.text}
						placeholder='Task text'
						onChange={handleChange}
						required
					/>
					<button style={style.button} type='submit'>
						ADD TASK
					</button>
					{error === false && !isLoading && (
						<h3 style={style.success}>TASK ADDED</h3>
					)}
					{error && alert(error)}
				</form>
			</div>
		</div>
	)
}

const style = {
	posWrapper: {
		width: '100%',
		height: '75vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	wrapper: {
		minWidth: 450,
		backgroundColor: '#008cff',
		textAlign: 'center',
		color: 'white',
		padding: '25px 10px 10px 10px',
		borderRadius: 10,
		boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.75)'
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	input: {
		margin: '15px 0',
		width: '80%',
		padding: 10,
		backgroundColor: '#b3ebff'
	},
	inputText: {
		height: 150
	},
	button: {
		backgroundColor: 'blue',
		margin: '20px 0',
		padding: '10px 30px',
		color: 'white',
		fontWeight: 700,
		borderRadius: 5,
		border: 'none',
		boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.75)'
	},
	success: {
		fontWeight: 700,
		color: 'green'
	}
}

const mapStatToProps = state => ({
	error: state.error,
	isLoading: state.isLoading
})

export default connect(mapStatToProps, { addTask })(Create)
