import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ListItem from './ListItem/ListItem'
import ToolBar from './ToolBar'
import { getTasks } from '../../actions'
import Pagination from './Pagination'

const List = ({ isLoading, isAdmin, tasks, error, getTasks }) => {
	const [queryFields, setQueryFields] = useState({
		field: 'id',
		direction: 'desc',
		page: '1'
	})

	useEffect(() => {
		const { field, direction, page } = queryFields
		getTasks(field, direction, page)
	}, [queryFields])

	const changeFields = (field, direction) => {
		setQueryFields({ ...queryFields, field, direction })
	}

	const changePage = page => {
		setQueryFields({ ...queryFields, page })
	}

	return (
		<div style={style.posWrapper}>
			<ToolBar changeFields={changeFields} />
			{isLoading || isLoading === undefined ? (
				<h2>Loading...</h2>
			) : (
				<>
					<table style={style.table}>
						<thead>
							<tr style={style.thead}>
								<th>User Name</th>
								<th>Email</th>
								<th>Task</th>
								<th>Status</th>
								{isAdmin && <th>Change status</th>}
								{isAdmin && <th>Edit</th>}
							</tr>
						</thead>
						<tbody>
							{tasks.tasks.map((task, i) => (
								<ListItem
									key={task.id}
									id={task.id}
									name={task.username}
									email={task.email}
									task={task.text}
									status={task.status}
								/>
							))}
						</tbody>
					</table>
					<Pagination
						changePage={changePage}
						currentPage={Number(queryFields.page)}
						tasks={tasks.total_task_count}
					/>
					{error && alert(error)}
				</>
			)}
		</div>
	)
}

const style = {
	posWrapper: {
		maxWidth: 1200,
		margin: '0 auto',
		height: '100%',
		marginTop: 20
	},
	table: {
		marginTop: 20,
		textAlign: 'center',
		width: '100%',
		borderCollapse: 'collapse'
	},
	thead: {
		fontSize: 22,
		borderBottom: '3px solid blue'
	}
}

const mapStateToProps = state => ({
	tasks: state.tasks,
	isLoading: state.isLoading,
	isAdmin: state.adminToken,
	error: state.error
})

export default connect(mapStateToProps, { getTasks })(List)
