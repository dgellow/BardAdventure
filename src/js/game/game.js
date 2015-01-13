var Game = function() {
    this.mapGrid = {
        width: 24,
        height: 16,
        tileWidth: 16,
        tileHeight: 16
    };

    this.player = {
        x: 5,
        y: 5,
        animSpeed: 8
    };

    this.textStyle =  {
        'font-size': '24px',
        'font-family': 'Arial',
        'color': 'white',
        'text-align': 'center'
    };
};

Game.prototype.start = function() {
    Crafty.init(this.getWidth(), this.getHeight());
    Crafty.background('rgb(87, 109, 20)');

    Crafty.scene('Loading');
};

Game.prototype.getWidth = function() {
    return this.mapGrid.width * this.mapGrid.tileWidth;
};

Game.prototype.getHeight = function() {
    return this.mapGrid.height * this.mapGrid.tileHeight;
};

module.exports = new Game();
