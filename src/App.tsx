import * as React from 'react';
import './App.css';
import JSONEditor from './editor/index';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <JSONEditor />
      </div>
    );
  }
}

export default App;
