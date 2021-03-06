import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import string_to_slug from '../../helpers/slugify';
import lightFormat from 'date-fns/lightFormat';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: 15
    },
    dateStyle: {
        marginTop: 15
    },
}));

const PostItem = ({ title, content, _id, _createdOn }) => {
    const classes = useStyles();
    return (
        <Card variant="outlined" className={classes.root}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    <Link to={`${_id}/${string_to_slug(title)}`}>{title}</Link>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {content}
                </Typography>
                <Typography className={classes.dateStyle} variant="body2" color="textSecondary" component="p">
                    {lightFormat(new Date(_createdOn), 'yyyy-MM-dd')}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PostItem;
