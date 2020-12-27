const Band = require( './band' );

class BandList {
    constructor() {
        this.bands = [
            new Band( 'Maná' ),
            new Band( 'Soda Stereo' ),
            new Band( 'Los Prisioneros' ),
            new Band( 'Enanitos Verdes' )
        ];
    }

    getBands = () => {
        return this.bands;
    }

    addBand = ( name ) => {
        const newBand = new Band( name );
        this.bands.push( newBand );

        return this.bands;
    }

    deleteBand = ( id ) => {
        this.bands = this.bands.filter( band => band.id !== id );

        return this.bands;
    }

    incrementVotes = ( id ) => {
        this.bands = this.bands.map( band => {
            if( band.id === id ) {
                band.votes++;
            }

            return band;
        } );
    }

    changeNameBand = ( id, newName ) => {
        this.bands = this.bands.map( band => {
            if( band.id === id ) {
                band.name = newName;
            }

            return band;
        } );
    }
}

module.exports = BandList;
