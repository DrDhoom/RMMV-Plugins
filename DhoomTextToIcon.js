//=============================================================================
// DhoomTextToIcon.js
//=============================================================================
var Imported = Imported || {};
Imported.Dhoom_TexttoIcon = true;

var Dhoom = Dhoom || {};
Dhoom.TexttoIcon = Dhoom.TexttoIcon || {};

/*:
 * @plugindesc Draw icon instead of text. Version 1.1
 * @author DrDhoom
 *
 * @param Text and Icon
 * @desc Specify which texts that will be converted into icons. [[Text, Icon Index], [Text, Icon Index], ...]
 * @default [['Skill', 20], ['^^POWERICON^^', 11], ['Harold', 35]]
 *
 * @param Active Scene
 * @desc In which scenes this script will be applied? If Empty, it'll be applied to all scene. [Scene, Scene, ...]
 * @default [Scene_Map, Scene_Menu]
 *
 * @help This plugin does not provide plugin commands.
 */

Dhoom.Parameters = PluginManager.parameters('DhoomTextToIcon');

Dhoom.TexttoIcon.txtIconArray = eval(Dhoom.Parameters['Text and Icon'] || '[]');
Dhoom.TexttoIcon.txtScene = eval(Dhoom.Parameters['Active Scene'] || '[]');

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// Window_Base
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
Dhoom.TexttoIcon.Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {    
    text = Dhoom.TexttoIcon.Window_Base_convertEscapeCharacters.call(this, text);
    if (this.isTextToIconEnabled()) {
        for (var i in Dhoom.TexttoIcon.txtIconArray) {
            text = text.replace(Dhoom.TexttoIcon.txtIconArray[i][0], '\x1bI[' + Dhoom.TexttoIcon.txtIconArray[i][1] + ']');
        }
    }
    return text;
};

Dhoom.TexttoIcon.Window_Base_drawText = Window_Base.prototype.drawText;
Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
    if (this.isTextToIconEnabled()) {
        var iconIndexText = false;
        Dhoom.TexttoIcon.txtIconArray.some(function(entry) {
            if (entry[0] === text) {
                iconIndexText = entry[1];
                return true;
            }
        });
        if (iconIndexText) {
            this.drawIcon(iconIndexText, x, y);
        } else {
            Dhoom.TexttoIcon.Window_Base_drawText.call(this, text, x, y, maxWidth, align);
        }
    } else {
        Dhoom.TexttoIcon.Window_Base_drawText.call(this, text, x, y, maxWidth, align);
    }
};

Window_Base.prototype.isTextToIconEnabled = function() {
    if (Dhoom.TexttoIcon.txtScene.length > 0) {
        for (var i in Dhoom.TexttoIcon.txtScene) {
            if (SceneManager._scene instanceof Dhoom.TexttoIcon.txtScene[i]) return true;
        }
    } else {
        return true;
    }
    return false;
};
