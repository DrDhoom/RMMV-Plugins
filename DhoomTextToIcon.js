//=============================================================================
// DhoomTextToIcon.js
//=============================================================================

var Imported = Imported || {};
Imported.Dhoom_TextToIcon = true;

var Dhoom = Dhoom || {};
Dhoom.TextToIcon = Dhoom.TextToIcon || {};

/*:
 * @plugindesc v1.1 - Draw icon instead of text for specified words.
 * @author DrDhoom
 *
 * @param Text and Icon
 * @desc Specify which text converted into which icon. [Text, Icon Index] | [Text, Icon Index] | ... | [Text, Icon Index]
 * @default [New Game, 8] | [Status, 21]
 *
 * @param Active Scene
 * @desc In which scenes this script will be applied? If Empty, it'll be applied to all scene. [Scene, Scene, ..., Scene]
 * @default [Scene_Title, Scene_Menu]
 *
 * @help v1.1 - Draw icon instead of text for specified words.
 by DrDhoom (drd-workshop.blogspot.com)
 */

Dhoom.Parameters = PluginManager.parameters('DhoomTextToIcon');
Dhoom.TextToIcon.txtIconArray = String(Dhoom.Parameters['Text and Icon']).split('|').map(function(string) {
    if (string.match(/\[(.*?),\s*?(\d+)\]/)) return [RegExp.$1, parseInt(RegExp.$2)];
});
Dhoom.TextToIcon.txtScenes = eval(Dhoom.Parameters['Active Scene']) || [];

Dhoom.TextToIcon.Window_Base_drawText = Window_Base.prototype.drawText;
Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
    var sceneIncluded = false;
    if (Dhoom.TextToIcon.txtScenes.length > 0) {
        Dhoom.TextToIcon.txtScenes.forEach(function(entry) {
            if (SceneManager._scene instanceof entry) sceneIncluded = true;
        }, this);        
    } else {
        sceneIncluded = true;
    }
    if (sceneIncluded) {
        var iconIndexText = false;
        Dhoom.TextToIcon.txtIconArray.forEach(function(entry) {
            if (entry[0] === text) iconIndexText = entry[1];
        }, this);
        if (iconIndexText) {
            this.drawIcon(iconIndexText, x, y);
        } else {
            Dhoom.TextToIcon.Window_Base_drawText.call(this, text, x, y, maxWidth, align);
        }
    } else {
        Dhoom.TextToIcon.Window_Base_drawText.call(this, text, x, y, maxWidth, align);
    }
};
