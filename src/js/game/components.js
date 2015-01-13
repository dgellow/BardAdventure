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
        this.requires('Actor, Fourway, Collision, SpriteAnimation, sprite_player')
            .fourway(1)
            .stopOnSolids()
            .onHit('Village', this.visitVillage)
            .animate('PlayerMovingUp', 0, 0, 2)
            .animate('PlayerMovingRight', 0, 1, 2)
            .animate('PlayerMovingDown', 0, 2, 2)
            .animate('PlayerMovingLeft', 0, 3, 2);

        // Events
        this.bind('NewDirection', function(data) {
            console.log(JSON.stringify(data));
            if (data.x > 0) {
                this.animate('PlayerMovingRight', Game.player.animSpeed);
            } else if (data.x < 0) {
                this.animate('PlayerMovingLeft', Game.player.animSpeed);
            } else if (data.y > 0) {
                this.animate('PlayerMovingDown', Game.player.animSpeed);
            } else if (data.y < 0) {
                this.animate('PlayerMovingUp', Game.player.animSpeed);
            } else {
                this.stop();
            }
        });
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
        Crafty.audio.play('knock');
        Crafty.trigger('VillageVisited', this);
    }
});
