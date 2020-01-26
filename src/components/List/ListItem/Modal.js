import React from 'react'
import ReactDOM from 'react-dom'

const Modal = ({ children }) => {
	return ReactDOM.createPortal(
		<div>
			<div style={style.backdropStyle}></div>
			<div style={style.posWrapper}>{children}</div>
		</div>,
		document.getElementById('root-modal')
	)
}

const style = {
	posWrapper: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '75vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 5
	},
	backdropStyle: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '100vh',
		zIndex: 4,
		backgroundColor: 'rgba(0, 0, 0, 0.7)'
	}
}

export default Modal
