import React from 'react'

const Pagination = ({ tasks, changePage, currentPage }) => {
	const pages = Math.ceil(tasks / 3)
	let renderItems = []

	let currentStyle = i => {
		return currentPage === i ? style.current : null
	}

	for (let i = 0; i < pages; i++) {
		renderItems.push(
			<button
				key={i}
				onClick={() => changePage(i + 1)}
				style={{ ...style.item, ...currentStyle(i + 1) }}
			>
				{i + 1}
			</button>
		)
	}
	return <div style={style.wrapper}>{renderItems}</div>
}

const style = {
	wrapper: {
		display: 'flex',
		justifyContent: 'center',
		margin: 25
	},
	item: {
		backgroundColor: 'blue',
		color: 'white',
		borderRadius: '50%',
		border: 'none',
		boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.75)',
		fontWeight: 700,
		fontSize: 18,
		padding: '10px 15px',
		margin: 10,
		cursor: 'pointer',
		outline: 'none'
	},
	current: {
		backgroundColor: '#0a1e3d'
	}
}

export default Pagination
