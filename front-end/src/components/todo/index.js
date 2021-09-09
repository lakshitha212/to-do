import React, { Component } from 'react';
import axios from 'axios';

import Todo from './todo';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import NotesIcon from '@material-ui/icons/Notes';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import auth from "../../protected/auth";
import { BACKEND_URL } from '../../protected/constants'

const drawerWidth = 240;

const styles = (theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#00b7bd'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    avatar: {
        height: 110,
        width: 100,
        flexShrink: 0,
        flexGrow: 0,
        marginTop: 20
    },
    uiProgess: {
        position: 'fixed',
        zIndex: '1000',
        height: '31px',
        width: '31px',
        left: '45%',
        top: '35%',
        color:'#00b7bd'
    },
    toolbar: theme.mixins.toolbar
});

class TodoLayout extends Component {
    state = {
        render: false
    };

    loadTodoPage = (event) => {
        this.setState({ render: false });
    };

    logoutHandler = (event) => {
        auth.logout(() => {
            this.props.history.push("/");
        });
    };

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            profilePicture: '',
            uiLoading: true,
            imageLoading: false
        };
    }

    componentDidMount = () => {
        auth.authentication(this.props.history)
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios.get(`${BACKEND_URL}user`).then((response) => {
            this.setState({
                firstName: response.data.data.first_name,
                lastName: response.data.data.last_name,
                uiLoading: false,
                profilePicture: response.data.data.avatar
            });
        }).catch((error) => {
            this.logoutHandler()
        });
    };

    render() {
        const { classes } = this.props;
        if (this.state.uiLoading === true) {
            return (
                <div className={classes.root}>
                    {this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
                </div>
            );
        } else {
            return (
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" noWrap>
                                TODO APP ASSIGNMENT - SURGE
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper
                        }}
                    >
                        <div className={classes.toolbar} />
                        <Divider />
                        <center>
                            <img alt="Avatar" src={this.state.profilePicture} className={classes.avatar}/>
                            <p>
                                {' '}
                                {this.state.firstName} {this.state.lastName}
                            </p>
                        </center>
                        <Divider />
                        <List>
                            <ListItem button key="Todo" onClick={this.loadTodoPage} selected>
                                <ListItemIcon>
                                    {' '}
                                    <NotesIcon />{' '}
                                </ListItemIcon>
                                <ListItemText primary="Todo" />
                            </ListItem>

                            <ListItem button key="Logout" onClick={() => {
                                auth.logout(() => {
                                    this.props.history.push("/");
                                });
                            }}>
                                <ListItemIcon>
                                    {' '}
                                    <ExitToAppIcon />{' '}
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </List>
                    </Drawer>

                    <div><Todo /></div>
                </div>
            );
        }
    }
}

export default withStyles(styles)(TodoLayout);