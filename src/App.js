import React from 'react';
import './App.scss';
import './Tabs.scss';
import { Tabs } from 'antd';
import Timer from './components/timer/Timer';
import Countdown from './components/countdown/Countdown';

const { TabPane } = Tabs;

function App() {
  return (
    <div className="App">
      <Tabs className="Tabs" defaultActiveKey="1">
        <TabPane tab="Timer" key="1">
          <Timer />
        </TabPane>
        <TabPane tab="Countdown" key="2">
          <Countdown />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
