//=============================================================================
// DhoomMessageSE.js
//=============================================================================
var Imported = Imported || {};
Imported.Dhoom_MessageSE = true;

var Dhoom = Dhoom || {};
Dhoom.MessageSE = Dhoom.MessageSE || {};
/*:
 * @plugindesc Dhoom MessageSE v1.0a - 18/07/2019
 * @author DrDhoom - drd-workshop.blogspot.com
 * 
 * @param Enable Switch
 * @desc Switch that determine whether message SE will be played or not. 0/None = Always Active.
 * @type switch
 * @default 0
 * 
 * @param Preset Settings
 * @desc The first preset will be the default setting.
 * @type struct<presetSetting>[]
 * @default ["{\"name\":\"Default\",\"characterSe\":\"{\\\"name\\\":\\\"Electrocardiogram\\\",\\\"volume\\\":\\\"100\\\",\\\"pitch\\\":\\\"100\\\",\\\"pan\\\":\\\"0\\\",\\\"variance\\\":\\\"2\\\"}\",\"wordSe\":\"{\\\"name\\\":\\\"Electrocardiogram\\\",\\\"volume\\\":\\\"100\\\",\\\"pitch\\\":\\\"70\\\",\\\"pan\\\":\\\"0\\\"}\",\"sentenceSe\":\"{\\\"name\\\":\\\"Hammer\\\",\\\"volume\\\":\\\"100\\\",\\\"pitch\\\":\\\"100\\\",\\\"pan\\\":\\\"0\\\"}\",\"pageSe\":\"{\\\"name\\\":\\\"Explosion1\\\",\\\"volume\\\":\\\"100\\\",\\\"pitch\\\":\\\"100\\\",\\\"pan\\\":\\\"0\\\"}\",\"characterDelay\":\"2\",\"wordDelay\":\"6\",\"sentenceDelay\":\"12\"}","{\"name\":\"Typewriter\",\"characterSe\":\"{\\\"name\\\":\\\"Cursor1\\\",\\\"volume\\\":\\\"100\\\",\\\"pitch\\\":\\\"100\\\",\\\"pan\\\":\\\"0\\\",\\\"variance\\\":\\\"0\\\"}\",\"wordSe\":\"{\\\"name\\\":\\\"Cursor1\\\",\\\"volume\\\":\\\"100\\\",\\\"pitch\\\":\\\"110\\\",\\\"pan\\\":\\\"0\\\",\\\"variance\\\":\\\"5\\\"}\",\"sentenceSe\":\"{\\\"name\\\":\\\"Cursor1\\\",\\\"volume\\\":\\\"100\\\",\\\"pitch\\\":\\\"120\\\",\\\"pan\\\":\\\"0\\\",\\\"variance\\\":\\\"0\\\"}\",\"pageSe\":\"{\\\"name\\\":\\\"Hammer\\\",\\\"volume\\\":\\\"100\\\",\\\"pitch\\\":\\\"100\\\",\\\"pan\\\":\\\"0\\\",\\\"variance\\\":\\\"0\\\"}\",\"characterDelay\":\"1\",\"wordDelay\":\"12\",\"sentenceDelay\":\"24\"}"]
 *
 * @help =============================================================================
 * • Show Message Escape Characters
 * =============================================================================
 *   \mse[PRESET]
 *   - Change message SE preset. PRESET can be preset number (start from 0) or 
 *     preset name.
 *   - Ex. \mse[2]
 *         \mse[Typewriter]
 *   \msee
 *   - Enable message SE only for this message, regardless whether the switch 
 *     is enabled or not.
 *   \msed
 *   - Disable message SE only for this message.
 * 
 * =============================================================================
 * • Plugin Command
 * =============================================================================
 *   MessageSE PRESET
 *   - Change message SE preset. PRESET can be preset number (start from 0) or 
 *     preset name. 
 */

/*~struct~presetSetting:
@param name
@text Preset Name
 
@param characterSe
@text Character SE Setting
@desc Sound Effect that will be played at the end of each characters.
@type struct<seSetting>
@default {"name":"","volume":"100","pitch":"100","pan":"0"}

@param wordSe
@text Word SE Setting
@desc Sound Effect that will be played at the end of each words.
@type struct<seSetting>
@default {"name":"","volume":"100","pitch":"100","pan":"0"}

@param sentenceSe
@text Sentence SE Setting
@desc Sound Effect that will be played at the end of each sentences.
@type struct<seSetting>
@default {"name":"","volume":"100","pitch":"100","pan":"0"}

@param pageSe
@text Page SE Setting
@desc Sound Effect that will be played at the end of each pages.
@type struct<seSetting>
@default {"name":"","volume":"100","pitch":"100","pan":"0"}

@param characterDelay
@text Character Delay
@desc Delay between each characters in frame.
@type number
@min 0
@default 0

@param wordDelay
@text Word Delay
@desc Delay between each words in frame.
@type number
@min 0
@default 12

@param sentenceDelay
@text Sentence Delay
@desc Delay between each sentences in frame.
@type number
@min 0
@default 24

@param ignoredCharacters
@text Ignored Characters
@desc These characters won't trigger the character SE.
@type text[]
@default []

@param ignoredWords
@text Ignored Words
@desc These words won't trigger the word SE.
@type text[]
@default []

@param ignoredSentences
@text Ignored Sentences
@desc These sentences won't trigger the sentence SE.
@type text[]
@default []
*/

/*~struct~seSetting:
@param name
@text Filename
@type file
@dir audio/se/
 
@param volume
@text Volume
@type number
@min 0
@max 100
@default 100

@param pitch
@text Pitch
@type number
@min 50
@max 150
@default 100

@param pan
@text Pan
@type number
@min -100
@max 100
@default 0

@param variance
@text Pitch Variance
@desc Pitch will vari based on this percentage.
@type number
@min 0
@max 100
@default 0
*/

Dhoom.Parameters = PluginManager.parameters('DhoomMessageSE');
if (!Dhoom.jsonParse) {
    Dhoom.jsonParse = function (string) {
        try {
            return JSON.parse(string, function (key, value) {
                try {
                    return this.jsonParse(value);
                } catch (e) {
                    return value;
                }
            }.bind(this))
        } catch (e) {
            return string;
        }
    };
}
if (!Dhoom.loadParam) {
    Dhoom.loadParam = function (sym) {
        return Dhoom.jsonParse(Dhoom.Parameters[sym]);
    };
}

Dhoom.MessageSE.switch = Dhoom.loadParam('Enable Switch');
Dhoom.MessageSE.presets = Dhoom.loadParam('Preset Settings');
Dhoom.MessageSE.presets.forEach(function (preset) {
    preset.ignoredCharacters = (preset.ignoredCharacters || []).map(function (char) {
        return char.toLowerCase();
    });
    preset.ignoredWords = (preset.ignoredWords || []).map(function (char) {
        return char.toLowerCase();
    });
    preset.ignoredSentences = (preset.ignoredSentences || []).map(function (char) {
        return char.toLowerCase();
    });
});

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// SoundManager
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
Dhoom.MessageSE.SoundManager_preloadImportantSounds = SoundManager.preloadImportantSounds;
SoundManager.preloadImportantSounds = function () {
    Dhoom.MessageSE.SoundManager_preloadImportantSounds.call(this);
    this.preloadMessageSe();
};

SoundManager.preloadMessageSe = function () {
    Dhoom.MessageSE.presets.forEach(function (set) {
        AudioManager.loadStaticSe(set.characterSe);
        AudioManager.loadStaticSe(set.wordSe);
        AudioManager.loadStaticSe(set.sentenceSe);
        AudioManager.loadStaticSe(set.pageSe);
    });
};

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// Game_System
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
Game_System.prototype.messageSePreset = function () {
    return Dhoom.MessageSE.presets[this.messageSePresetId()];
};

Game_System.prototype.messageSePresetId = function () {
    return this._messageSePresetId || 0;
};

Game_System.prototype.setMessageSePreset = function (index) {
    var presets = Dhoom.MessageSE.presets;
    if (!isNaN(parseInt(index))) index = parseInt(index);
    if (presets[index]) {
        this._messageSePresetId = index;
    } else if (typeof index === "string") {
        for (var i = 0; i < presets.length; i++) {
            if (String(presets[i].name).toLowerCase() === index.toLowerCase()) {
                this._messageSePresetId = i;
                return;
            }
        }
    }
};

Game_System.prototype.isMessageSeEnabled = function () {
    return !Dhoom.MessageSE.switch || $gameSwitches.value(Dhoom.MessageSE.switch);
};

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// Game_Interpreter
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
Dhoom.MessageSE.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    if (command.toLowerCase() === 'messagese') {
        $gameSystem.setMessageSePreset(args.join(' ').trim());
    }
    Dhoom.MessageSE.Game_Interpreter_pluginCommand.call(this, command, args);
};

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// Window_Message
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
Dhoom.MessageSE.Window_Message_clearFlags = Window_Message.prototype.clearFlags;
Window_Message.prototype.clearFlags = function () {
    Dhoom.MessageSE.Window_Message_clearFlags.call(this);
    this._messageSeDelay = 0;
    this._messageSeDisabled = false;
    this._messageSeEnabled = false;
};

Dhoom.MessageSE.Window_Message_processNormalCharacter = Window_Message.prototype.processNormalCharacter;
Window_Message.prototype.processNormalCharacter = function (textState) {
    var i = textState.index;
    Dhoom.MessageSE.Window_Message_processNormalCharacter.call(this, textState);
    this.updateMessageSE(i, textState);
};

Dhoom.MessageSE.Window_Message_updateMessage = Window_Message.prototype.updateMessage;
Window_Message.prototype.updateMessage = function () {
    if (this._messageSeDelay) {
        this._messageSeDelay--;
        this.updateShowFast();
        return true;
    }
    return Dhoom.MessageSE.Window_Message_updateMessage.call(this);
};

Window_Message.prototype.updateMessageSE = function (i, textState) {
    if ((this._messageSeEnabled || (!this._messageSeDisabled && $gameSystem.isMessageSeEnabled())) && !this._showFast && !this._lineShowFast) {
        var preset = $gameSystem.messageSePreset();
        var se, delay;
        var char = textState.text[i];
        if (this.isEndOfText(textState)) {
            se = preset.pageSe;
        } else if (char.match(/([^\s])/g)) {
            var pChar = textState.text[i - 1];
            var nChar = textState.text[i + 1];
            if (char.match(/[.!?'"]/g) && pChar && pChar.match(/[^.!?\s]/g) && (!nChar || nChar.match(/\s/g))) {
                if (!preset.ignoredSentences.contains(RegExp.$1.toLowerCase())) {
                    se = preset.sentenceSe;
                    delay = preset.sentenceDelay;
                }
            } else {
                if (!preset.ignoredCharacters.contains(RegExp.$1.toLowerCase())) {
                    se = preset.characterSe;
                    delay = preset.characterDelay;
                }
            }
        } else if (textState.text[i - 1] && textState.text[i - 1].match(/[^.!?'"]/g)) {
            se = preset.wordSe;
            delay = preset.wordDelay;
        }
        if (se) {
            if (se.variance) {
                se = JsonEx.makeDeepCopy(se);
                var amp = Math.floor(se.pitch * se.variance / 100);
                se.pitch += Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;
            }
            AudioManager.playStaticSe(se);
        }
        if (delay) this._messageSeDelay = delay;
    }
};

Dhoom.MessageSE.Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function (code, textState) {
    switch (code) {
        case 'MSE':
            $gameSystem.setMessageSePreset(this.obtainMSEEscapeParam(textState));
            break;
        case 'MSEE':
            this._messageSeEnabled = true;
            this._messageSeDisabled = false;
            break;
        case 'MSED':
            this._messageSeEnabled = false;
            this._messageSeDisabled = true;
            break;
        default:
            Dhoom.MessageSE.Window_Message_processEscapeCharacter.call(this, code, textState);
            break;
    }
};

Window_Message.prototype.obtainMSEEscapeParam = function (textState) {
    var arr = /^\[.+\]/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return arr[0].slice(1, arr[0].length - 1);
    } else {
        return '';
    }
};