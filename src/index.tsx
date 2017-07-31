import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import GaeaDoc from './website/index';
import './index.css';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

const Index = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/doc">Doc</Link></li>
            </ul>

            <hr/>

            <Route exact={true} path="/" component={App}/>
            <Route path="/doc" component={GaeaDoc}/>
        </div>
    </Router>
);

ReactDOM.render(
    <Index />,
    document.getElementById('root') as HTMLElement
);