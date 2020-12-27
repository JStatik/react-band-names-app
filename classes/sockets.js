const colors = require( 'colors' );
const BandList = require( './bandList' );

class Sockets {
    constructor( io ) {
        this.io = io;
        this.bandsList = new BandList();
        this.eventsSockets();
    }

    eventsSockets = () => {
        this.io.on( 'connection', ( client ) => {
            console.log( colors.yellow( 'Dispositivo conectado' ) );
        
            client.on( 'disconnect', () => {
                console.log( colors.red( 'Dispositivo desconectado' ) );
            } );

            client.emit( 'bandsList', { bands: this.bandsList.getBands() } );

            client.on( 'addBand', ( data, callback ) => {
                if( !callback ) return;

                const bands = this.bandsList.addBand( data.name );
                client.broadcast.emit( 'bandsList', { bands: bands } );
                callback( { bands: bands } );
            } );

            client.on( 'incrementVotes', ( data, callback ) => {
                if( !callback ) return;

                this.bandsList.incrementVotes( data.id );
                client.broadcast.emit( 'bandsList', { bands: this.bandsList.getBands() } );
                callback( { bands: this.bandsList.getBands() } );
            } );

            client.on( 'deleteBand', ( data, callback ) => {
                if( !callback ) return;

                const bands = this.bandsList.deleteBand( data.id );
                client.broadcast.emit( 'bandsList', { bands: bands } );
                callback( { bands: bands } );
            } );

            client.on( 'changeNameBand', ( data, callback ) => {
                if( !callback ) return;

                const { id, name } = data;
                this.bandsList.changeNameBand( id, name );

                client.broadcast.emit( 'bandsList', { bands: this.bandsList.getBands() } );
                callback( { bands: this.bandsList.getBands() } );
            } );
        } );
    }
}

module.exports = Sockets;
