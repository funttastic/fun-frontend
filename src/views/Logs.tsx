import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Logs = () => {
    return (
        <Tabs>
            <TabList>
                <Tab>Fun Client</Tab>
                <Tab>HB Gateway</Tab>
                <Tab>HB Client</Tab>
            </TabList>

            <TabPanel>
                <h2>Funttastic Client Logs</h2>
            </TabPanel>
            <TabPanel>
                <h2>Hummingbot Gateway Logs</h2>
            </TabPanel>
            <TabPanel>
                <h2>Hummingbot Client Logs</h2>
            </TabPanel>
        </Tabs>
    );
};

export default Logs;
