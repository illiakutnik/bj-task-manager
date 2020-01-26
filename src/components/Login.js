import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions'

const Login = ({ login, error }) => {
	const [values, setValues] = useState({
		login: '',
		password: ''
	})

	const [errors, setErrors] = useState({
		loginError: '',
		passwordError: ''
	})

	const handleChange = event => {
		setValues({
			...values,
			[event.target.name]: event.target.value
		})
	}

	const validate = () => {
		if (values.login !== 'admin') {
			setErrors({ loginError: 'Invalid Email' })
		} else if (values.password !== '123') {
			setErrors({ passwordError: 'Invalid Password' })
		} else {
			return true
		}
	}

	const handleSubmit = event => {
		event.preventDefault()
		const isValid = validate()
		if (isValid) {
			let loginData = new FormData()
			loginData.append('username', values.login)
			loginData.append('password', values.password)
			login(loginData)
		}
	}
	return (
		<div style={style.posWrapper}>
			<div style={style.wrapper}>
				<h1>Login</h1>
				<form onSubmit={handleSubmit} style={style.form}>
					<input
						style={style.input}
						type='text'
						placeholder='Please type your email'
						name='login'
						value={values.login}
						onChange={handleChange}
						required
					/>
					<span style={style.error}>{errors.loginError}</span>
					<input
						style={style.input}
						type='password'
						placeholder='Please type your password'
						name='password'
						value={values.password}
						onChange={handleChange}
						required
					/>
					<span style={style.error}>{errors.passwordError}</span>
					<button style={style.button} type='submit'>
						LOGIN
					</button>
				</form>
				{error && alert(error)}
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
		minHeight: 300,
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
		margin: '20px 0',
		width: '80%',
		padding: 10,
		backgroundColor: '#b3ebff'
	},
	button: {
		backgroundColor: 'blue',
		margin: '20px 0',
		padding: '10px 30px',
		fontSize: 18,
		color: 'white',
		fontWeight: 700,
		borderRadius: 5,
		border: 'none',
		boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.75)'
	},
	error: {
		marginTop: -10,
		fontSize: 14,
		color: 'red'
	}
}
const mapStateToProps = state => ({
	error: state.error
})

export default connect(mapStateToProps, { login })(Login)
