import React, { useState } from 'react'
import { connect } from 'react-redux'
import { editTask } from '../../../actions'
import Modal from './Modal'

const ListItem = ({
	id,
	name,
	email,
	task,
	status,
	admin,
	error,
	editTask
}) => {
	const editIndex = task.indexOf('*editByAdmin')
	if (editIndex) {
		task = task.slice(0, editIndex)
	}

	const [editModal, setEditModal] = useState(false)

	const [text, setText] = useState(task)

	const switchHandler = () => {
		const newStatus = status ? 0 : 10
		let editObj = new FormData()
		editObj.append('status', newStatus)
		editObj.append('token', admin)
		editTask(id, editObj)
	}

	const handleEditSubmit = () => {
		const mark = '*editByAdmin'
		const token = localStorage.getItem('token')
		if (!token) alert('You need to authorize to edit')
		if (task !== text) {
			let editObj = new FormData()
			editObj.append('text', text + mark)
			editObj.append('token', token)
			editTask(id, editObj)
		}
		setEditModal(false)
	}

	const showEditModal = () => {
		if (editModal) {
			return (
				<Modal>
					<div style={style.wrapper}>
						<h2>Edit Text</h2>
						<form onSubmit={handleEditSubmit} style={style.form}>
							<textarea
								style={{ ...style.input, ...style.inputText }}
								name='text'
								value={text}
								onChange={e => setText(e.target.value)}
							/>
							<div style={style.buttonWrapper}>
								<button
									onClick={handleEditSubmit}
									style={{ ...style.button, width: 80 }}
									type='submit'
								>
									EDIT
								</button>
								<button
									onClick={() => setEditModal(false)}
									style={{
										...style.button,
										backgroundColor: 'red',
										width: 80
									}}
									type='button'
								>
									CANCEL
								</button>
							</div>
						</form>
						{error && alert(error)}
					</div>
				</Modal>
			)
		}
	}

	return (
		<>
			<tr style={style.tr}>
				<td style={style.td}>{name}</td>
				<td>{email}</td>
				<td style={style.textarea}>
					<>
						{task}
						<br />
						{editIndex !== -1 ? (
							<b style={{ fontSize: 14 }}>
								<i>*edit by admin</i>
							</b>
						) : null}
					</>
				</td>
				<td>{status ? 'Done' : 'In progress'}</td>
				{admin && (
					<td style={style.tdAdmin}>
						<button style={style.button} onClick={switchHandler}>
							Switch Status
						</button>
					</td>
				)}
				{admin && (
					<td style={style.tdAdmin}>
						<button
							onClick={() => setEditModal(state => !state)}
							style={style.button}
						>
							Edit
						</button>
					</td>
				)}
			</tr>
			{showEditModal()}
		</>
	)
}

const style = {
	tr: {
		borderBottom: '2px solid blue'
	},
	td: {
		padding: '40px 40px'
	},
	tdAdmin: {
		padding: '0 20px'
	},
	textarea: {
		padding: '0 40px'
	},
	button: {
		backgroundColor: 'blue',
		padding: '10px 10px',
		color: 'white',
		fontWeight: 700,
		borderRadius: 5,
		border: 'none',
		boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.75)'
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
		backgroundColor: '#b3ebff',
		height: 150
	},
	buttonWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '40%'
	}
}

const mapStateToProps = state => ({
	admin: state.adminToken,
	error: state.error
})

export default connect(mapStateToProps, { editTask })(ListItem)
