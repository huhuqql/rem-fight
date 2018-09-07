"use strict";
cc._RF.push(module, '74cefI+miRBX4aO/UYCBjWd', 'Game');
// scripts/Game.js

'use strict';

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var Player = require("Player");

module.exports = {
    curScript: 0,
    scene: 0
};

cc.Class({
    extends: cc.Component,

    properties: {

        ground: {
            default: null,
            type: cc.Node
        },

        player: {
            default: null,
            type: cc.Node
        },

        monster1Prefab: {
            default: null,
            type: cc.Prefab
        },

        bossPrefab: {
            default: null,
            type: cc.Prefab
        },

        blastPrefab: {
            default: null,
            type: cc.Prefab
        },

        chatBoxPrefab: {
            default: null,
            type: cc.Prefab
        },

        guideCatPrefab: {
            default: null,
            type: cc.Prefab
        },

        instructionDisplay: {
            default: null,
            type: cc.Label
        },

        startBGMAudio: {
            default: null,
            type: cc.AudioClip
        },

        bgmAudio: {
            default: null,
            type: cc.AudioClip
        }

    },

    getaBlastLocation: function getaBlastLocation() {
        var blastLocation = this.player.getPosition();
        var playerInfo = this.player.getComponent(Player);

        var faceDirection = playerInfo.faceDirection;
        switch (faceDirection) {
            case 'left':
                blastLocation.x -= 100;
                playerInfo.leftOnSkill = true;
                break;
            case 'right':
                blastLocation.x += 100;
                playerInfo.rightOnSkill = true;
                break;
            case 'front':
                blastLocation.y -= 100;
                playerInfo.frontOnSkill = true;
                break;
            case 'back':
                blastLocation.y += 100;
                playerInfo.backOnSkill = true;
                break;
        }
        return blastLocation;
    },

    getMonsterPosition: function getMonsterPosition() {
        var randX = (Math.random() - 0.5) * 2 * (this.node.getChildByName("newbg").width / 2 - 50);
        var randY = (Math.random() - 0.5) * 2 * (this.node.getChildByName("newbg").height / 2 - 50);

        return cc.v2(randX, randY);
    },

    showMonster1: function showMonster1() {
        var monster = cc.instantiate(this.monster1Prefab);
        this.node.addChild(monster);
        monster.setPosition(this.getMonsterPosition());
    },
    showBoss: function showBoss() {
        var boss = cc.instantiate(this.bossPrefab);
        this.node.addChild(boss);
        var posX = this.node.x - this.node.width / 2;
        var posY = this.node.y - 100;
        boss.setPosition(cc.v2(posX, posY));
    },
    produceBlast: function produceBlast() {
        console.log(this.node.children);
        var fireBlast = cc.instantiate(this.blastPrefab);
        this.node.addChild(fireBlast);
        fireBlast.setPosition(this.getaBlastLocation());
    },
    showChatBox: function showChatBox() {
        var chatBox = cc.instantiate(this.chatBoxPrefab);
        this.node.addChild(chatBox);
        chatBox.setPosition(cc.v2(this.node.x - this.node.width / 2, this.node.y - this.node.height * 3 / 4));
    },
    showGuideCat: function showGuideCat() {
        var guideCat = cc.instantiate(this.guideCatPrefab);
        this.node.addChild(guideCat);
        guideCat.setPosition(cc.v2(this.player.x + 450, this.player.y));
    },
    playStartBGMSound: function playStartBGMSound() {
        this.bgm = cc.audioEngine.play(this.startBGMAudio, false, 0.7);
    },
    playBGMSound: function playBGMSound() {
        this.bgm = cc.audioEngine.play(this.bgmAudio, false, 0.7);
    },
    stopSound: function stopSound() {
        cc.audioEngine.stop(this.bgm);
    },


    onLoad: function onLoad() {
        this.score = 0;
        this.timer = 0;
        this.timeInterval = 3;
        this.difficultyTimer = 0;
        this.difficultyInterval = 20;
        this.end = 60;
        this.monsterRespawnSpeed = 1;
        this.lose = false;
        this.gameStart = false;
        this.bossFight = false;
        // this.curScript = 0;
    },

    onDestroy: function onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.j:
                this.produceBlast();
                break;
            case cc.macro.KEY.u:
                this.clearScene();
                this.letGameStart();
                break;
            case cc.macro.KEY.r:
                if (!this.gameStart) this.restartGame();
                break;
        }
    },
    letGameStart: function letGameStart() {
        if (!this.gameStart) {
            console.log("游戏开始");
            this.gameStart = true;
            if (this.node.getChildByName("guide") == null) {
                this.showGuideCat();
            }
            var guideInfo = this.node.getChildByName("guide").getComponent("GuideCat");
            guideInfo.timer = 0;
            guideInfo.timeInterval = 5;
            this.instructionDisplay.string = "WASD to control move\n\r J to use skill";
            this.stopSound();
            this.playBGMSound();
        }
    },
    playerAction: function playerAction(action) {
        var playerInfo = this.player.getComponent(Player);
        if (action == 1) playerInfo.moveAround = true;
    },


    update: function update(dt) {
        if (this.gameStart) {
            if (this.lose) {
                while (true) {
                    var temp = this.node.getChildByName("hulk-1");
                    if (temp == null) break;
                    this.node.removeChild(temp);
                }
                while (true) {
                    var temp = this.node.getChildByName("bullet");
                    if (temp == null) break;
                    this.node.removeChild(temp);
                }
                while (true) {
                    var temp = this.node.getChildByName("red-bullet");
                    if (temp == null) break;
                    this.node.removeChild(temp);
                }
                this.node.removeChild(this.node.getChildByName("boss"));
                this.gameStart = false;
                this.instructionDisplay.string = "You lost. \n\rPress R to restart";
                return;
            }
            if (this.end <= 0) {
                if (!this.bossFight) {
                    this.showBoss();
                    this.bossFight = true;
                }
                if (this.node.getChildByName("hulk-1") == null && this.node.getChildByName("boss") == null) {
                    var guideInfo = this.node.getChildByName("guide").getComponent("GuideCat");
                    guideInfo.timeInterval = 9999;
                    this.gameStart = false;
                    this.endScene();
                    this.instructionDisplay.string = "The end of Demo...";
                }
            } else {
                if (this.timer >= this.timeInterval) {
                    this.timer = 0;
                    for (var i = 0; i < this.monsterRespawnSpeed; i++) {
                        console.log("怪物出现");
                        this.showMonster1();
                    }
                }
                if (this.difficultyTimer >= this.difficultyInterval) {
                    this.instructionDisplay.string = "";
                    this.difficultyTimer = 0;
                    this.monsterRespawnSpeed++;
                }
                this.difficultyTimer += dt;
                this.timer += dt;
                this.end -= dt;
            }
        }
    },

    endScene: function endScene() {
        this.showChatBox();
    },
    restartGame: function restartGame() {
        this.stopSound();
        this.score = 0;
        this.timer = 0;
        this.timeInterval = 3;
        this.difficultyTimer = 0;
        this.difficultyInterval = 30;
        this.end = 90;
        this.monsterRespawnSpeed = 1;
        this.lose = false;
        this.gameStart = false;
        this.bossFight = false;
        this.letGameStart();
    },
    startScene: function startScene() {
        this.playerAction(1);
        setTimeout(function () {
            if (!this.gameStart) {
                this.showChatBox();
                cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
                cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
                this.instructionDisplay.string = "Press U to skip...";
            }
        }.bind(this), 7000);

        setTimeout(function () {
            if (!this.gameStart) this.showGuideCat();
        }.bind(this), 15000);

        setTimeout(function () {
            if (!this.gameStart) {
                this.letGameStart();
            }
        }.bind(this), 30500);
    },
    clearScene: function clearScene() {
        this.node.removeChild(this.node.getChildByName("chatbox"));
    },
    start: function start() {
        this.playStartBGMSound();
        setTimeout(function () {
            this.startScene();
        }.bind(this), 1000);
    }
});

cc._RF.pop();