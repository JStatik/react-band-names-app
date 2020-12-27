import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

const BandList = () => {
    const { socket, bands, setBands } = useContext( SocketContext );

    const incrementVotes = ( id ) => {
        socket.emit( 'incrementVotes', { id: id }, ( { bands } ) => {
            setBands( bands );
        } );
    };

    const deleteBand = ( id ) => {
        socket.emit( 'deleteBand', { id: id }, ( { bands } ) => {
            setBands( bands );
        } );
    };

    const handleInputChange = ( event ) => {
        const newName = event.target.value;

        setBands(
            ( bands ) => bands.map( band => {
                if( band.id === event.target.name ) {
                    band.name = newName;
                }
    
                return band;
            } )
        );
    };

    const lostFocus = ( event ) => {
        const id = event.target.name;
        const newName = event.target.value;

        socket.emit( 'changeNameBand', { id: id, name: newName }, ( { bands } ) => {
            setBands( bands );
        } );
    };

    return (
        <table className="table table-striped">
            <thead>
                <tr className="text-center">
                    <th>Increment</th>
                    <th>Name</th>
                    <th>Votes</th>
                    <th>Delete</th>
                </tr>
            </thead>

            <tbody>
                {
                    bands.map( band => (
                        <tr key={ band.id }>
                            <td><button className="btn btn-primary" onClick={ () => incrementVotes( band.id ) }>+1</button></td>
                            <td><input className="form-control" onBlur={ lostFocus } onChange={ handleInputChange } name={ band.id } value={ band.name }/></td>
                            <td className="text-center"><h4>{ band.votes }</h4></td>
                            <td><button className="btn btn-danger" onClick={ () => deleteBand( band.id ) }><i className="fas fa-trash"></i></button></td>
                        </tr>
                    ) )
                }
            </tbody>
        </table>
    );
};

export default BandList;
