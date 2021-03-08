import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, resetCreateStatus, getPost, resetSinglePost, updatePost, resetUpdateStatus } from '../Posts/PostsSlice';
import { useForm } from '../../helpers/useForm';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const initialValues = {
    title: "",
    content: ""
};

const Form = () => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const { status, createPostStatus, singlePost, updatePostStatus } = useSelector(state => state.PostsSlice);
    const [values, setValues, handleOnChange] = useForm(initialValues);
    const [error, setError] = useForm(initialValues);
    const newPost = history.location.pathname === '/new-post';

    useEffect(() => {
        if(newPost){
            dispatch(resetSinglePost());
        }else{
            dispatch(getPost(id));
        }
    }, [newPost]);

    useEffect(() => {
        if(singlePost._id){
            const { title, content } = singlePost;
            setValues({title: `${title}`, content: `${content}`});
        }else{
            setValues(initialValues);
        }
    }, [singlePost]);

    const onSubmit = (e) => {
        e.preventDefault();
        // simple validation
        if(values.title === "" && values.content === ""){
            setError({...error, title: "error", content: "error"});
        }else if(values.title === ""){
            setError({...error, title: "error", content: ""});
        }else if(values.content === ""){
            setError({...error, title: "", content: "error"});
        }else{
            if(newPost){
                dispatch(createPost(values));
            }else{
                console.log(id, values)
                dispatch(updatePost({...values, id}));
            }
        }
    }

    useEffect(() => {
        if(createPostStatus) {
            dispatch(resetCreateStatus()); // reset create status post value from true to null
            history.push('/'); // redirect when post successfully created
        }
    }, [createPostStatus]);

    useEffect(() => {
        if(updatePostStatus) {
            dispatch(resetUpdateStatus()); // reset create status post value from true to null
            history.push('/'); // redirect when post successfully created
        }
    }, [updatePostStatus]);

    return (
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
            <Grid>
                <Grid item xs={12}>
                    <TextField id="standard-basic" label="Title" fullWidth
                        value={values.title}
                        name="title"
                        onChange={handleOnChange}
                        required
                        error={error.title === "error"}
                        helperText={error.title === "error" ? 'Empty!' : ' '}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="standard-multiline-static"
                        label="Content"
                        multiline
                        rows={8}
                        fullWidth
                        name="content"
                        value={values.content}
                        onChange={handleOnChange}
                        required
                        error={error.content === "error"}
                        helperText={error.content === "error" ? 'Empty!' : ' '}
                    />
                </Grid>
            </Grid>
            <Button 
                variant="contained" 
                onClick={() => history.goBack()}>
                Back
            </Button>
            <Button variant="contained" color="primary" type="submit" disabled={status ? true : false}>{newPost ? 'Submit' : 'Update'}</Button>
        </form>
    );
};

export default Form;
