ig.module(
    'game.entities.pnj'
)

    .requires(
        'impact.entity'
    )
    .defines(function () {


        EntityPnj = ig.Entity.extend({
            size: {x: 31, y: 48},
            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.FIXED,
            greeting: null,
            complete: null,

            speed: 40,
            i: 0,
            // canMove: true,

            animSheet: new ig.AnimationSheet('media/oldmen2.png', 32, 32),

            init: function (x, y, settings) {
                this.parent(x, y, settings);

                this.addAnim('up', .21, [9, 10, 11]);
                this.addAnim('down', .21, [0, 1, 2]);
                this.addAnim('left', .21, [3, 4, 5]);
                this.addAnim('right', .21, [6, 7, 8]);
                this.addAnim('idleup', 0.1, [10]);
                this.addAnim('idledown', 0.1, [1]);
                this.addAnim('idleleft', 0.1, [4]);
                this.addAnim('idleright', 0.1, [7]);
                this.currentAnim = this.anims.idledown;
                this.greeting = new ig.Sound('media/sound/oldgreeting.*');
                this.greeting.volume = 0.2;
                this.complete = new ig.Sound('media/sound/old.*');
                this.complete.volume = 0.2;
                movementtimer = new ig.Timer();
            },

            charactermovement: function () {

                var randomdirection = Math.floor(Math.random() * 5) + 1;

                if (randomdirection == 1) {
                    this.vel.x = -64;
                    this.vel.y = 0;
                    this.currentAnim = this.anims.left;
                    this.formerpressed = 'left';

                }
                else if (randomdirection == 3) {
                    this.vel.x = 64;
                    this.vel.y = 0;
                    this.currentAnim = this.anims.right;
                    this.formerpressed = 'right';
                }
                else if (randomdirection == 2) {
                    this.vel.y = -64;
                    this.vel.x = 0;
                    this.currentAnim = this.anims.up;

                    this.formerpressed = 'up';
                }
                else if (randomdirection == 4) {
                    this.vel.y = 64;
                    this.vel.x = 0;
                    this.currentAnim = this.anims.down;

                    this.formerpressed = 'down';
                }
                else {
                    this.vel.y = 0;
                    this.vel.x = 0;
                    if (this.formerpressed === 'left') {
                        this.currentAnim = this.anims.idleleft;
                    }
                    else if (this.formerpressed === 'right') {
                        this.currentAnim = this.anims.idleright;
                    }
                    else if (this.formerpressed === 'up') {
                        this.currentAnim = this.anims.idleup;
                    }
                    else if (this.formerpressed === 'down') {
                        this.currentAnim = this.anims.idledown;
                    }
                }
            }

            ,
            nomovement: function (formerpressed) {
                this.vel.y = 0;
                this.vel.x = 0;
                if (formerpressed === 'left') {
                    this.currentAnim = this.anims.idleleft;

                }
                else if (formerpressed === 'right') {
                    this.currentAnim = this.anims.idleright;

                }
                else if (formerpressed === 'up') {
                    this.currentAnim = this.anims.idleup;

                }
                else if (formerpressed === 'down') {
                    this.currentAnim = this.anims.idledown;
                }
            }
            ,

            update: function () {

                if (movementtimer.delta() > 5 && this.vel.y == 0 && this.vel.x == 0 && ig.game.canMove === true) {
                    this.charactermovement();
                }
                if (movementtimer.delta() > 6 && (this.vel.y > 0 || this.vel.x > 0)) {
                    this.nomovement(this.formerpressed);
                    movementtimer = new ig.Timer();
                }

                this.parent();
            }
            ,

            check: function (other) {
                if (other instanceof EntityPlayer) {
                    this.nomovement(this.formerpressed);
                    movementtimer = new ig.Timer();
                }
            }
            ,
        });


    });