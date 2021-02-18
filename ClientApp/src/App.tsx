import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Sessions from './components/Sessions';
import Navbar from './components/Navbar';

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <hr />

            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/sessions">
                    <Sessions />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
