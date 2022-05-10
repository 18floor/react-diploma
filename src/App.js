import './App.css';
import React from 'react';
import {
    BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import Layout from './layouts/Layout';
import NotFound from './pages/404';
import About from './pages/About';
import Contacts from "./pages/Contacts";
import Main from "./pages/Main";
import Catalog from "./pages/Catalog";

function App() {

    return (
        <div className="App">
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path="/about">
                            <About/>
                        </Route>
                        <Route exact path="/catalog">
                            <Catalog/>
                        </Route>
                        <Route exact path="/contacts">
                            <Contacts/>
                        </Route>
                        <Route exact path="/">
                            <Main/>
                        </Route>
                        <Route exact path="/404">
                            <NotFound/>
                        </Route>
                        <Route path="*">
                            <Redirect to="/404"/>
                        </Route>
                    </Switch>
                </Layout>
            </Router>
        </div>
    );
}

export default App;
