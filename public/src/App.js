import React from 'react';
import { SocketProvider } from './context/SocketContext';
import BandNames from './pages/BandNames';

const App = () => {
    return (
        <SocketProvider>
            <BandNames />
        </SocketProvider>
    );
};

export default App;
