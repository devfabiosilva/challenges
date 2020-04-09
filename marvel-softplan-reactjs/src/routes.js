import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import Favorite from './pages/Favorite';
import NotFound from './pages/NotFound';

export default function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/fav" component={Favorite} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}
