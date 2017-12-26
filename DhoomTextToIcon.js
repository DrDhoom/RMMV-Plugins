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
 * @desc Texts that will be converted into icons. Icon can be more than 1. [Text, Icon Index] | [Text, Icon Index] | ...
 * @default ['Skill', 20] | ['^^POWERICON^^', 11] | ['Harold', 20, 21, 22, 23, 24, 25, 26]
 *
 * @param Active Scene
 * @desc In which scenes this script will be applied? If Empty, it'll be applied to all scene. [Scene, Scene, ...]
 * @default [Scene_Map, Scene_Menu]
 *
 * @help This plugin does not provide plugin commands.
 */

Dhoom.Parameters = PluginManager.parameters('DhoomTextToIcon');

Dhoom.TexttoIcon.txtIconArray = Dhoom.Parameters['Text and Icon'].split('|').map(function(str) {
    return eval(str.trim());
});
Dhoom.TexttoIcon.txtScene = eval(Dhoom.Parameters['Active Scene'] || '[]');

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// Window_Base
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
Dhoom.TexttoIcon.Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
    text = Dhoom.TexttoIcon.Window_Base_convertEscapeCharacters.call(this, text);
    if (this.isTextToIconEnabled()) {
        for (var i in Dhoom.TexttoIcon.txtIconArray) {
            var entry = Dhoom.TexttoIcon.txtIconArray[i];
            if (!entry) continue;
            if (text.contains(entry[0])) {
                var res = '';
                for (var n = 1; n < entry.length; n++) {
                    res += '\x1bI[' + entry[n] + ']';
                }
                text = text.replace(entry[0], res);
            }            
        }
    }
    return text;
};

Dhoom.TexttoIcon.Window_Base_drawText = Window_Base.prototype.drawText;
Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
    if (this.isTextToIconEnabled()) {
        var icons;
        Dhoom.TexttoIcon.txtIconArray.some(function(entry) {
            if (entry && entry[0] === text) {
                icons = entry;
                return true;
            }
        }, this);
        if (icons) {
            for (var i = 1; i < icons.length; i++) {
                this.drawIcon(icons[i], x + (i - 1) * Window_Base._iconWidth, y);
            }
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
