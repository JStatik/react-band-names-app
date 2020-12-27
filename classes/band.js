const uniqid = require( 'uniqid' );

class Band {
    constructor( name ) {
        this.id = uniqid();
        this.name = name;
        this.votes = 0;
    }
}

module.exports = Band;
