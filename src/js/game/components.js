Crafty.c('Grid', {
    init: function() {},
    grid: function(gridOptions) {
        this.attr({
            w: gridOptions.tileWidth,
            h: gridOptions.tileHeight,
            grid: gridOptions
        });
        return this;
    },

    at: function(x, y) {
        var width = this.grid.tileWidth;
        var height = this.grid.tileHeight;
        if (x === undefined || y === undefined) {
            return {x: this.x / width, y: this.y / height};
        } else {
            this.attr({x: x * width, y: y * height});
            return this;
        }
    }
});

Crafty.c('Actor', {
    init: function() {
        this.requires('2D, Canvas, Grid');
    }
});

Crafty.c('Tree', {
    init: function() {
        this.requires('Actor, Solid, sprite_tree');
    }
});

Crafty.c('Bush', {
    init: function() {
        this.requires('Actor, Solid, sprite_bush');
    }
});

Crafty.c('Player', {
    init: function() {
        this.requires('Actor, Fourway, Collision, sprite_player')
            .fourway(4)
            .stopOnSolids()
            .onHit('Village', this.visitVillage);
    },

    stopOnSolids: function() {
        this.onHit('Solid', this.stopMovement);
        return this;
    },

    stopMovement: function() {
        this._speed = 0;
        if (this._movement) {
            this.x -= this._movement.x;
            this.y -= this._movement.y;
        }
    },

    visitVillage: function(data) {
        data[0].obj.collect();
    }
});

Crafty.c('Village', {
    init: function() {
        this.requires('Actor, sprite_village');
    },

    collect: function() {
        this.destroy();
        Crafty.trigger('VillageVisited', this);
    }
});
