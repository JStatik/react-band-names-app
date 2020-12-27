import React, { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

const AddBand = () => {
    const { socket, setBands } = useContext( SocketContext );
    const [ nameBand, setNameBand ] = useState( '' );

    const handleInputChange = ( event ) => {
        setNameBand( event.target.value );
    };

    const handleSubmit = ( event ) => {
        event.preventDefault();

        if( nameBand.trim().length > 0 ) {
            socket.emit( 'addBand', { name: nameBand }, ( { bands } ) => {
                setBands( bands );
                setNameBand( '' );
            } );
        }
    };

    return (
        <>
            <h4>Add Band</h4>

            <form autoComplete="off" onSubmit={ handleSubmit }>
                <input className="form-control mb-2" placeholder="Agregar banda" onChange={ handleInputChange } value={ nameBand }/>
                <button type="submit" className="btn btn-success">Add</button>
            </form>
        </>
    );
};

export default AddBand;
