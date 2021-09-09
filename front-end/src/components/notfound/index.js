import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const styles = (theme) => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class NotFound extends Component {
    render() {
        const { classes } = this.props;
        return (<Card className={classes.root}>
            <CardContent>
                <Typography variant="h2" component="h2">
                    Page not found :(
                </Typography>
                <Typography variant="h5" component="h5">
                    Maybe the page you are looking for has been removed, or you typed in the wrong URL
                </Typography>
            </CardContent>
            <CardActions>
                <Link to="/">
                    Go Back
                </Link>
            </CardActions>
        </Card>)
    }
};
export default withStyles(styles)(NotFound);