import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Editor from './scenes/Editor';
import registerServiceWorker from './registerServiceWorker';

import * as firebase from 'firebase'
import { config } from './config'

firebase.initializeApp(config)

ReactDOM.render(<Editor />, document.getElementById('root'));
registerServiceWorker();
