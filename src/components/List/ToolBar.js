import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ToolBar = ({ changeFields }) => {
	
	const [ascendSwitch, setAscendSwitch] = useState(true)

	const clickHandler = field => {
		const asc = ascendSwitch ? 'asc' : 'desc'
		changeFields(field, asc)
		setAscendSwitch(state => !state)
	}

	return (
		<div style={style.container}>
			<div style={style.sortContainer}>
				<h2>Sort by:</h2>
				<button
					onClick={() => clickHandler('username')}
					style={{ ...style.button, ...style.sortButton }}
				>
					Name
				</button>
				<button
					onClick={() => clickHandler('email')}
					style={{ ...style.button, ...style.sortButton }}
				>
					Email
				</button>
				<button
					onClick={() => clickHandler('status')}
					style={{ ...style.button, ...style.sortButton }}
				>
					Status
				</button>
			</div>
			<Link to='/create' style={{ ...style.button, ...style.addButton }}>
				Add new task
			</Link>
		</div>
	)
}

const style = {
	container: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	sortContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	button: {
		color: 'white',
		backgroundColor: 'blue',
		outline: 'none',
		border: 'none',
		cursor: 'pointer',
		borderRadius: '5px',
		fontWeight: 700,
		boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.75)'
	},
	sortButton: {
		marginLeft: '10px',
		fontSize: '16px',
		padding: '7px 15px'
	},
	addButton: {
		fontSize: '18px',
		padding: '10px 20px',
		textDecoration: 'none'
	}
}

export default ToolBar
