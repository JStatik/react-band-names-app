import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';

const useSocket = ( serverPath ) => {
    const socket = useMemo( () => io.connect( serverPath, { transports: [ 'websocket' ] } ), [ serverPath ] );
    const [ online, setOnline ] = useState( false );
    const [ bands, setBands ] = useState( [] );

    useEffect( () => {
        socket.on( 'connect', () => {
            setOnline( true );
        } );

        socket.on( 'disconnect', () => {
            setOnline( false );
        } );
    }, [ socket ] );

    useEffect( () => {
        socket.on( 'bandsList', ( { bands } ) => {
            setBands( bands );
        } );

        return () => socket.off( 'bandsList' );
    }, [ socket ] );

    return { socket, online, bands, setBands };
};

export default useSocket;
