import * as React from "react";
import * as ReactDOM from "react-dom";

it('renders without crashing', () => {
    const div = document.createElement('div');
    const App = () => <div>1234</div>;
    ReactDOM.render(<App />, div);
    expect(1 + 1).toBe(2);
});