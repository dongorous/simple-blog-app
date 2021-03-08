import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost, deletePost, resetDeleteStatus } from '../Posts/PostsSlice';
import DeleteConfirmation from '../Modal/DeleteConfirmation';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';

const Post = () => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const { singlePost, status, deletePostStatus } = useSelector(state => state.PostsSlice);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(getPost(id));
    }, []);

    useEffect(() => {
        if(deletePostStatus) {
            dispatch(resetDeleteStatus()); // reset delete status post value from true to null
            history.push('/'); // redirect when post successfully deleted
        }
    }, [deletePostStatus]);
    
    const deleteNow = () => {
        dispatch(deletePost(id));
    };

    const closeModal = () => {
        setShowModal(false);
    };

    if(status == "loading-single-post") return <CircularProgress />;

    return (
        <>
            <Card variant="outlined">
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {singlePost.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {singlePost.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button 
                        size="small" 
                        variant="contained" 
                        onClick={() => history.goBack()}>
                        Back
                    </Button>
                    <div>
                        <Button 
                            size="small" 
                            variant="contained" 
                            color="secondary" 
                            onClick={() => setShowModal(true)}>
                            Delete
                        </Button>
                        <Button 
                            size="small" 
                            color="primary" 
                            variant="contained" 
                            color="primary" 
                            component={Link} 
                            to={`/edit-post/${id}`}>
                            Edit Post
                        </Button>
                    </div>
                </CardActions>
            </Card>

            <DeleteConfirmation 
                showModal={showModal}
                closeModal={closeModal}
                deleteNow={deleteNow}
                status={status}
            />
        </>
    );
};

export default Post;