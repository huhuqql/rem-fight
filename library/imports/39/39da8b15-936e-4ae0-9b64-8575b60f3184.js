"use strict";
cc._RF.push(module, '39da8sVk25K4JtkhXW2DzGE', 'Apple');
// scripts/Apple.js

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
cc.Class({
   extends: cc.Component,

   properties: {},

   // use this for initialization
   onLoad: function onLoad() {

      this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
         this.opacity = 100;
         var delta = event.touch.getDelta();
         this.x += delta.x;
         this.y += delta.y;
      }, this.node);
      this.node.on(cc.Node.EventType.TOUCH_END, function () {
         this.opacity = 255;
      }, this.node);
   },

   // called every frame
   update: function update(dt) {}
});

cc._RF.pop();