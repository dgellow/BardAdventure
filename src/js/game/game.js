var _ = require('lodash');

var Game = function() {
    this.mapGrid = {
        width: 24,
        height: 16,
        tile: {
            width: 16,
            height: 16
        }
    };
};

Game.prototype.start = function() {
    // Initialize and start the game
    Crafty.init(this.getWidth(), this.getHeight());
    Crafty.background('green');

    // Place trees
    generateForest(this.mapGrid);
};

Game.prototype.getWidth = function() {
    return this.mapGrid.width * this.mapGrid.tile.width;
};

Game.prototype.getHeight = function() {
    return this.mapGrid.height * this.mapGrid.tile.height;
};

var generateForest = function(mapGrid) {
    var rangeX = _.range(mapGrid.width);
    var rangeY = _.range(mapGrid.height);
    var tilesCoord = _.flatten(_.map(rangeX, function(x) {
        return _.map(rangeY, function(y) {
            return {x: x, y: y};
        });
    }));

    var trees = _.chain(tilesCoord)
        .filter(function(t) {return isAtEdge(mapGrid, t.x, t.y); })
        .map(function(t) {
            return createTree(t.x, t.y, mapGrid.tile.width, mapGrid.tile.height);
        }).value();

    var bushes = _.chain(tilesCoord)
        .filter(function(t) {
            return (Math.random() < 0.06) && !isAtEdge(mapGrid, t.x, t.y);
        }).map(function(t) {
            return createBush(t.x, t.y, mapGrid.tile.width, mapGrid.tile.height);
        }).value();
};

var isAtEdge = function(mapGrid, x, y) {
    return x === 0 || x === (mapGrid.width - 1) ||
        y === 0 || y === (mapGrid.height - 1);
};

var createTree = function(x, y, width, height) {
    return Crafty.e('2D, Canvas, Color')
        .attr({
            x: x * width,
            y: y * height,
            w: width,
            h: height
        })
        .color('rgb(20, 125, 40)');
};

var createBush = function(x, y, width, height) {
    return Crafty.e('2D, Canvas, Color')
        .attr({
            x: x * width,
            y: y * height,
            w: width,
            h: height
        })
        .color('rgb(20, 185, 40)');
};


module.exports = new Game();
