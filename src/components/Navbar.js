import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions'
import logo from '../logo.png'

const Navbar = ({ isAdmin, logout }) => {
	return (
		<header style={style.navbar}>
			<div style={style.posWrapper}>
				<div style={style.navWrapper}>
					<div style={style.logo}>
						<img style={style.logoImg} src={logo} alt='' />
						<Link style={style.link} to='/'>
							TASK MANAGER
						</Link>
					</div>
					<div style={style.links}>
						<Link style={style.link} to='/'>
							TASKS
						</Link>
						{!isAdmin ? (
							<Link style={style.link} to='/login'>
								LOGIN
							</Link>
						) : (
							<Link to='/' onClick={logout} style={style.link}>
								LOGOUT
							</Link>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}

const style = {
	navbar: {
		margin: 0,
		backgroundColor: 'blue',
		padding: 10,
		height: 50
	},
	posWrapper: {
		maxWidth: 1200,
		margin: '0 auto',
		height: '100%'
	},
	navWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%'
	},
	logo: {
		display: 'flex',
		alignItems: 'center'
	},
	links: {
		display: 'flex'
	},
	logoImg: {
		width: 40,
		height: 40
	},
	link: {
		color: 'white',
		textDecoration: 'none',
		fontWeight: 800,
		fontSize: 22,
		margin: '0 20px',
		display: 'flex'
	}
}

const mapStateToProps = state => ({
	isAdmin: state.adminToken
})

export default connect(mapStateToProps, { logout })(Navbar)
