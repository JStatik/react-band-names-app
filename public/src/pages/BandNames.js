import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import BandsChart from '../components/BandsChart';
import AddBand from '../components/AddBand';
import BandList from '../components/BandList';

const BandNames = () => {
    const { online } = useContext( SocketContext );
    
    return (
        <div className="container">
            <div className="alert alert-secondary mt-2 mb-0">
                Service status:
                { online ? <span className="text-success"> Online</span> : <span className="text-danger"> Offline</span> }          
            </div>

            <h1>Band Names</h1>
            <hr/>

            <div className="row">
                <div className="col">
                    <BandsChart />
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-8">
                    <BandList />
                </div>

                <div className="col-4">
                    <AddBand />
                </div>
            </div>
        </div>
    );
};

export default BandNames;
