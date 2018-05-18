import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import { DataGridTable } from './datagrid/datagrid-table/datagrid-table.component';
import { ResizableComponent } from './resizable/resizable-component';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
       <DataGridTable minHeight="200" columns={[{key: 'fname', name: 'First name'}, {key: 'lname', name: 'Last name'}]} data={[{fname:'Boris', lname:'Eltin'}, {fname: 'Vladimir', lname:'Putin'}]}>
       </DataGridTable>
       <br />
       <ResizableComponent render={<div>test test</div>}/>
      </div>
    );
  }
}

export default App;
