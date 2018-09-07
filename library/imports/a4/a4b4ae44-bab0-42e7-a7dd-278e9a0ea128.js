"use strict";
cc._RF.push(module, 'a4b4a5EurBC56fdJ46aDqEo', 'Chatbox');
// scripts/Chatbox.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var game = require("Game");

cc.Class({
    extends: cc.Component,

    properties: {

        catAvatarPrefab: {
            default: null,
            type: cc.Prefab
        },

        remAvatarPrefab: {
            default: null,
            type: cc.Prefab
        },

        hulkAvatarPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.timer = 0;
        this.timeInterval = 3;
        this.script;
        this.labelNode = new cc.Node("node");
        var that = this;
        if (game.scene == 0) {
            game.scene = 1;
            game.curScript = 0;
            cc.loader.loadRes("startScene", function (err, res) {
                that.script = res.json;
                console.log(that.script);
                that.updateDialog();
            });
        } else {
            game.curScript = 0;
            cc.loader.loadRes("endScene", function (err, res) {
                that.script = res.json;
                console.log(that.script);
                that.updateDialog();
            });
        }
    },
    updateDialog: function updateDialog() {
        console.log(game.curScript);
        console.log(this.script.length);
        if (game.curScript >= this.script.length) {
            this.node.destroy();
            return;
        }
        var curScript = this.script[game.curScript];
        if (curScript.Figure == "Rem") {
            this.showRemAvatar();
        } else if (curScript.Figure == "Cat" || curScript.Figure == "???") {
            this.showCatAvatar();
        } else {
            this.showHulkAvatar();
        }

        var label = this.labelNode.addComponent(cc.Label);
        label.string = this.script[game.curScript].Script;
        label.fontSize = 16;
        label.lineHeight = 20;
        label.horizontalalign = "LEFT";
        label.overflow = "RESIZE_HEIGHT";
        label.width = 380;

        var color = new cc.Color(0, 0, 0);
        var dX = this.node.x;
        var dY = this.node.y + this.node.height - 35;
        this.labelNode.width = 380;
        this.labelNode.height = 200;
        this.labelNode.position = cc.v2(dX, dY - this.labelNode.height / 2 + 20);
        this.labelNode.color = color;
        this.labelNode.parent = this.node;
    },
    showHulkAvatar: function showHulkAvatar() {
        this.clearAvatar();
        var hulkAvatar = cc.instantiate(this.hulkAvatarPrefab);
        this.node.addChild(hulkAvatar);
        var newX = this.node.x - this.node.width / 2 + hulkAvatar.width - 8;
        var newY = this.node.y + this.node.height + hulkAvatar.height / 2 - 2;
        hulkAvatar.setPosition(cc.v2(newX, newY));
    },
    showCatAvatar: function showCatAvatar() {
        this.clearAvatar();
        var catAvatar = cc.instantiate(this.catAvatarPrefab);
        this.node.addChild(catAvatar);
        var newX = this.node.x - this.node.width / 2 + catAvatar.width - 8;
        var newY = this.node.y + this.node.height + catAvatar.height / 2 - 2;
        catAvatar.setPosition(cc.v2(newX, newY));
    },
    showRemAvatar: function showRemAvatar() {
        this.clearAvatar();
        var remAvatar = cc.instantiate(this.remAvatarPrefab);
        this.node.addChild(remAvatar);
        var newX = this.node.x - this.node.width / 2 + remAvatar.width - 9;
        var newY = this.node.y + this.node.height + remAvatar.height / 2 - 2;
        remAvatar.setPosition(cc.v2(newX, newY));
    },
    clearAvatar: function clearAvatar() {
        this.node.removeAllChildren();
    },
    start: function start() {},
    update: function update(dt) {
        if (this.timer >= this.timeInterval) {
            this.timer = 0;
            game.curScript++;
            this.updateDialog();
        }
        this.timer += dt;
    }
});

cc._RF.pop();