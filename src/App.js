import React from 'react';
import './App.scss';
import './Tabs.scss';
import { Tabs } from 'antd';
import logo from './logo.png';
import Timer from './components/timer/Timer';

const { TabPane } = Tabs;

function App() {
  return (
    <div className="App">
      <header>
        <img src={logo} alt="logo" />
      </header>
      <Tabs className="Tabs" defaultActiveKey="1">
        <TabPane tab="Timer" key="1">
          <Timer />
        </TabPane>
        <TabPane tab="Countdown" key="2">
          Pane 2
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
