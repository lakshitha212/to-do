import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import axios from 'axios';
import auth from "../../protected/auth";
import { BACKEND_URL } from '../../protected/constants'

const customStyles = {
	'TODO': { borderColor: 'rgba(0, 0, 0, 0.12)', backgroundColor: "#fff" },
	'INPROGRESS': { borderColor: '#FF8C00', backgroundColor: "#FFA500" },
	'DONE': { borderColor: '#90EE90', backgroundColor: "#98FB98" }
}
const styles = (theme) => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	appBar: {
		position: 'relative',
		backgroundColor: '#00b7bd'
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1
	},
	submitButton: {
		display: 'block',
		color: 'white',
		textAlign: 'center',
		position: 'absolute',
		top: 14,
		right: 10
	},
	floatingButton: {
		position: 'fixed',
		bottom: 0,
		right: 0,
		color: '#00b7bd'
	},
	form: {
		width: '98%',
		marginLeft: 13,
		marginTop: theme.spacing(3)
	},
	toolbar: theme.mixins.toolbar,
	root: {
		minWidth: 470
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	pos: {
		marginBottom: 12
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
	},
	dialogeStyle: {
		maxWidth: '50%'
	},
	viewRoot: {
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	}
});

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

class Todo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: '',
			todoName: '',
			todoId: '',
			errors: [],
			open: false,
			uiLoading: true,
			buttonType: '',
			viewOpen: false
		};

		this.deleteTodoHandler = this.deleteTodoHandler.bind(this);
		this.handleEditClickOpen = this.handleEditClickOpen.bind(this);
		this.handleViewOpen = this.handleViewOpen.bind(this);
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	fetchTodos = () => {
		auth.authentication(this.props.history)
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios.get(`${BACKEND_URL}todos`).then((response) => {
			this.setState({
				todos: response.data.result,
				uiLoading: false
			});
		}).catch((err) => {
			console.log(err);
		});
	}

	componentDidMount = () => {
		this.fetchTodos()
	};

	deleteTodoHandler(data) {
		auth.authentication(this.props.history)
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		let todoId = data.todo._id;
		axios.delete(`${BACKEND_URL}todo/${todoId}`).then(() => {
			this.fetchTodos()
		}).catch((err) => {
			console.log(err);
		});
	}

	handleEditClickOpen(data) {
		this.setState({
			todoName: data.todo.todoName,
			todoId: data.todo._id,
			buttonType: 'Edit',
			open: true
		});
	}

	handleViewOpen(data) {
		this.setState({
			todoName: data.todo.todoName,
			viewOpen: true
		});
	}

	handleAlignment = (todoId, newAlignment) => {
		auth.authentication(this.props.history)
		if (newAlignment) {
			const authToken = localStorage.getItem('AuthToken');
			axios.defaults.headers.common = { Authorization: `${authToken}` };
			axios({ url: `${BACKEND_URL}todo/${todoId}`, method: 'put', data: { todoInfo: { status: newAlignment } } }).then(() => {
				this.fetchTodos()
			}).catch((err) => {
				console.log(err);
			});
		}
	};

	render() {
		const DialogTitle = withStyles(styles)((props) => {
			const { children, classes, onClose, ...other } = props;
			return (
				<MuiDialogTitle disableTypography className={classes.root} {...other}>
					<Typography variant="h6">{children}</Typography>
					{onClose ? (
						<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
							<CloseIcon />
						</IconButton>
					) : null}
				</MuiDialogTitle>
			);
		});

		const { classes } = this.props;
		const { open, errors, viewOpen } = this.state;

		const handleClickOpen = () => {
			this.setState({
				todoId: '',
				todoName: '',
				buttonType: '',
				open: true
			});
		};

		const handleSubmit = (event) => {
			auth.authentication(this.props.history)
			event.preventDefault();

			if (!this.state.todoName) {
				this.setState({ errors: { todoName: "ToDo name is required" } })
			} else {
				this.setState({ errors: { todoName: "" } })
				const userTodo = {
					todoName: this.state.todoName
				};
				let options = {};
				if (this.state.buttonType === 'Edit') {
					options = {
						url: `${BACKEND_URL}todo/${this.state.todoId}`,
						method: 'put',
						data: { todoInfo: userTodo }
					};
				} else {
					options = {
						url: `${BACKEND_URL}todo`,
						method: 'post',
						data: userTodo
					};
				}
				const authToken = localStorage.getItem('AuthToken');
				axios.defaults.headers.common = { Authorization: `${authToken}` };
				axios(options).then(() => {
					this.setState({ open: false });
					this.fetchTodos()
				}).catch((error) => {
					this.setState({ open: true, errors: error.response.data });
					console.log(error);
				});
			}
		};

		const handleViewClose = () => {
			this.setState({ viewOpen: false });
		};

		const handleClose = (event) => {
			this.setState({ open: false });
		};

		if (this.state.uiLoading === true) {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
				</main>
			);
		} else {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />

					<IconButton
						className={classes.floatingButton}
						color="primary"
						aria-label="Add Todo"
						onClick={handleClickOpen}
					>
						<AddCircleIcon style={{ fontSize: 60 }} />
					</IconButton>
					<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
						<AppBar className={classes.appBar}>
							<Toolbar>
								<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
									<CloseIcon />
								</IconButton>
								<Typography variant="h6" className={classes.title}>
									{this.state.buttonType === 'Edit' ? 'Edit Todo' : 'Create a new Todo'}
								</Typography>
								<Button
									autoFocus
									color="inherit"
									onClick={handleSubmit}
									className={classes.submitButton}
								>
									{this.state.buttonType === 'Edit' ? 'Save' : 'Submit'}
								</Button>
							</Toolbar>
						</AppBar>

						<form className={classes.form} noValidate>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="todoName"
										label="Todo Name"
										name="todoName"
										autoComplete="todoName"
										helperText={errors.todoName}
										value={this.state.todoName}
										error={errors.todoName ? true : false}
										onChange={this.handleChange}
									/>
								</Grid>
							</Grid>
						</form>
					</Dialog>

					<Grid container spacing={2}>
						{this.state.todos.map((todo) => (
							<Grid key={todo._id} item xs={12} sm={6}>
								<Card className={classes.root} style={customStyles[todo.status]} variant="outlined">
									<CardContent>
										<Typography variant="body1" component="div" style={{ whiteSpace: 'pre-wrap' }} >
											{todo.todoName}
										</Typography>
										<Typography variant="body1" component="div" style={{ whiteSpace: 'pre-wrap' }}>
											<ToggleButtonGroup
												style={{ float: 'right' }}
												selected={todo.status}
												value={todo.status}
												exclusive
												size="small"
												onChange={(e, value) => this.handleAlignment(todo._id, value)}
												aria-label="text alignment"
											>
												<ToggleButton value="TODO" aria-label="TODO">
													TODO
												</ToggleButton>
												<ToggleButton value="INPROGRESS" aria-label="INPROGRESS">
													INPROGRESS
												</ToggleButton>
												<ToggleButton value="DONE" aria-label="DONE">
													DONE
												</ToggleButton>
											</ToggleButtonGroup>
										</Typography>
									</CardContent>
									<CardActions>
										<Button size="small" color="primary" onClick={() => this.handleViewOpen({ todo })}>
											{' '}
											View{' '}
										</Button>
										<Button size="small" color="primary" onClick={() => this.handleEditClickOpen({ todo })}>
											Edit
										</Button>
										<Button size="small" color="primary" onClick={() => this.deleteTodoHandler({ todo })}>
											Delete
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>

					<Dialog
						onClose={handleViewClose}
						aria-labelledby="customized-dialog-title"
						open={viewOpen}
						fullWidth
						classes={{ paperFullWidth: classes.dialogeStyle }}
					>
						<DialogTitle id="customized-dialog-title" onClose={handleViewClose}>
							{this.state.todoName}
						</DialogTitle>
					</Dialog>
				</main>
			);
		}
	}
}

export default withStyles(styles)(Todo);