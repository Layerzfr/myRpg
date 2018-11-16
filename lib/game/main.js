ig.module(
    'game.main'
)
    .requires(
        'impact.game',
        'impact.font',
        'game.levels.main',
        'game.levels.lac',
        'game.entities.player',
        'game.entities.levelchange',
        'game.entities.rock',
        'game.entities.rockmove',
    )
    .defines(function () {

        MyGame = ig.Game.extend({

            // Load a font
            font: new ig.Font('media/04b03.font.png'),
            posX: 448,
            posY: 232,
            inventory: [],
            isInventoryOpen: false,
            quest: [],
            chat: null,
            level: "Main",
            chat: "",
            isChatOpen: false,
            canMove: true,
            chatPosX: null,
            chatPosY: null,
            missionComplete: false,

            init: function () {
                // Initialize your game here; bind keys etc.
                ig.music.add('media/sound/ff.*', "music");

                ig.music.volume = 0.05;
                ig.music.play();
                this.chatPosX = ig.system.width;
                this.chatPosY = ig.system.height;
                ig.input.bind(ig.KEY.Q, 'left');
                ig.input.bind(ig.KEY.D, 'right');
                ig.input.bind(ig.KEY.Z, 'up');
                ig.input.bind(ig.KEY.S, 'down');
                ig.input.bind(ig.KEY.I, 'inventory');
                ig.input.bind(ig.KEY.F, 'action');
                ig.input.bind(ig.KEY.TAB, 'quest');
                this.loadLevel(LevelMain);
            },

            loadLevel: function (data, pos, quest) {
                self = this;
                this.parent(data);
                if (pos === "left") {
                    this.spawnEntity(EntityPlayer, 900 - this.posX, this.posY, {flip: 1});
                } else if (pos === "right") {
                    this.spawnEntity(EntityPlayer, 952 - this.posX, this.posY, {flip: 1});
                } else {
                    this.spawnEntity(EntityPlayer, 448, 232, {flip: 1});
                    // this.spawnEntity(EntityGlasses, 220, 260, {flip: 1, collides: ig.Entity.COLLIDES.FIXED});
                }
                if (this.quest.length > 0) {
                    this.quest.forEach(function (quete) {
                        if (quete[0] === "lunette") {
                            if (quete[1] === "phase0" && ig.game.level === "Main") {
                                self.spawnEntity(EntityGlasses, 220, 260, {flip: 1, maxVel: {x: 0, y: 0}});
                                self.spawnEntity(EntityRock, 184, 248, {flip: 1, maxVel: {x: 0, y: 0}});
                                self.spawnEntity(EntityRockmove, 220, 280, {flip: 1, maxVel: {x: 0, y: 0}});
                                self.spawnEntity(EntityRock, 248, 248, {flip: 1, maxVel: {x: 0, y: 0}});
                                self.spawnEntity(EntityRock, 220, 216, {flip: 1, maxVel: {x: 0, y: 0}});
                            } else if (quete[1] === "phase1" && ig.game.level === "Main") {
                                self.spawnEntity(EntityRock, 184, 248, {flip: 1, maxVel: {x: 0, y: 0}});
                                self.spawnEntity(EntityRockmove, 220, 280, {flip: 1, maxVel: {x: 0, y: 0}});
                                self.spawnEntity(EntityRock, 248, 248, {flip: 1, maxVel: {x: 0, y: 0}});
                                self.spawnEntity(EntityRock, 220, 216, {flip: 1, maxVel: {x: 0, y: 0}});
                            } else if (quete[1] === "complete" && ig.game.level === "Main") {
                                self.spawnEntity(EntityRock, 184, 248, {flip: 1, maxVel: {x: 0, y: 0}});
                                self.spawnEntity(EntityRockmove, 220, 280, {flip: 1, maxVel: {x: 0, y: 0}});
                                self.spawnEntity(EntityRock, 248, 248, {flip: 1, maxVel: {x: 0, y: 0}});
                                self.spawnEntity(EntityRock, 220, 216, {flip: 1, maxVel: {x: 0, y: 0}});
                            }
                        }
                    });

                }

            },

            update: function () {
                // Update all entities and backgroundMaps
                this.parent();
                var player = ig.game.getEntitiesByType(EntityPlayer)[0];
                if (player) {
                    this.screen.x = player.pos.x - ig.system.width / 2;
                    this.screen.y = player.pos.y - ig.system.height / 2;
                }

                // Add your own, additional update code here
            },

            inventoryToString: function () {
                var invString = "Inventaire: \n";
                this.inventory.forEach(function (value, index, array) {
                    invString += value.id +
                        "\n";
                });
                return invString;
            },

            draw: function () {
                // Draw all entities and backgroundMaps
                this.parent();
                // console.log(text);


                // Add your own drawing code here
                // var x = ig.system.width / 2,
                //     y = ig.system.height / 2;
                if (this.isInventoryOpen === true) {
                    this.font.draw(this.inventoryToString(), ig.system.width / 2, 50, ig.Font.ALIGN.LEFT);
                }
                if (this.missionComplete === true) {
                    this.font.draw("MISSION COMPLETED", ig.system.width / 2, (ig.system.height / 2 - 150), ig.Font.ALIGN.BOTTOM);
                }

                this.font.draw(this.chat, this.chatPosX - this.screen.x, this.chatPosY - this.screen.y, ig.Font.ALIGN.BOTTOM);
            }
        });


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
        ig.main('#canvas', MyGame, 60, (952 / 2), (635 / 2), 2);

    });
