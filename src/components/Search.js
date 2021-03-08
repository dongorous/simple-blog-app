import React from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: 15
    }
}));

const Search = ({ search, onSearch }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <TextField 
                id="outlined-search" 
                label="Search post title" 
                fullWidth
                value={search} 
                onChange={(e) => onSearch(e.target.value)}
                type="search" 
                variant="outlined" />
        </div>
    )
}

export default Search
