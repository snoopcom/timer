import React from 'react';
import './App.scss';
import { Tabs } from 'antd';
import logo from './logo.png';

const { TabPane } = Tabs;

function App() {
  return (
    <div className="App">
      <header>
        <img src={logo} alt="logo" />
      </header>
      <Tabs className="Tabs" defaultActiveKey="1">
        <TabPane tab="Tab 1" key="1">
          Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Pane 2
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
