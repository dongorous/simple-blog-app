import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import Posts from '../components/Posts/Posts';
import Post from '../components/Post/Post';
import Form from '../components/common/Form';
import Container from '@material-ui/core/Container';

const App = () => {
    return (
        <Router>
            <Header />
            <Container maxWidth="md">
                <Switch>
                    <Route path="/" exact component={Posts} />
                    <Route path="/new-post" exact component={Form} />
                    <Route path="/edit-post/:id" exact component={Form} />
                    <Route path="/:id/:slug" exact component={Post} />
                </Switch>
            </Container>
        </Router>
    );
};

export default App;