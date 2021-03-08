import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    buttonMargin: {
        marginRight: 10,
    },

}));

const DeleteConfirmation = ({ showModal, closeModal, deleteNow, status }) => {
    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={showModal}
            onClose={closeModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={showModal}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">Aret you sure you want to delete this post?</h2>
                    <Button className={classes.buttonMargin} variant="contained" onClick={closeModal}>Cancel</Button>
                    <Button variant="contained" color="secondary" onClick={deleteNow} disabled={status ? true : false}>Yes</Button>
                </div>
            </Fade>
        </Modal>
    );
}

export default DeleteConfirmation;