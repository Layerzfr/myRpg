ig.module(
    'game.entities.rock'
)

    .requires(
        'impact.entity',
        'game.entities.levelchange',
    )
    .defines(function () {

        EntityRock = ig.Entity.extend({
            size: {x: 32, y: 35},
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.FIXED,

            animSheet: new ig.AnimationSheet('media/rock.png', 32, 35),

            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('left', 0.1, [0]);
                this.currentAnim = this.anims.left;
            },

            update: function () {
                // var player = ig.game.getEntitiesByType(EntityPlayer)[0];
                // if (this.distanceTo(player) < 50 && ig.input.pressed('action')) {
                //     ig.game.inventory.push(this);
                //     ig.game.quest.forEach(function (quete) {
                //         if(quete[0] === "lunette"){
                //             quete[1]= "phase1";
                //         }
                //     });
                //     this.kill();
                // }
                this.parent();
            },
        });
    });