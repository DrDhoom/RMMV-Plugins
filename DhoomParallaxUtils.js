//=============================================================================
// DhoomParallaxUtils.js
//=============================================================================
var Imported = Imported || {};
Imported.Dhoom_ParallaxUtils = true;

var Dhoom = Dhoom || {};
Dhoom.ParallaxUtils = Dhoom.ParallaxUtils || {};
/*:
 * @plugindesc Dhoom ParallaxUtils v1.1a - 06/01/2019
 * @author DrDhoom - drd-workshop.blogspot.com
 * 
 * @param Global Switch
 * @desc When this switch is Off, all layers will be disabled. 0/None = Always On.
 * @type switch
 * @default 0
 * 
 * @param Parallax Presets
 * @desc Preset settings.
 * @type struct<presetSetting>[]
 * @default ["{\"name\":\"Animated Light\",\"filename\":\"%2_%3%4\",\"order\":\"Above All Characters\",\"z\":\"1\",\"loop\":\"false\",\"lock\":\"{\\\"type\\\":\\\"Map\\\",\\\"eventId\\\":\\\"1\\\",\\\"shiftX\\\":\\\"0\\\",\\\"shiftY\\\":\\\"0\\\"}\",\"scrollX\":\"0\",\"scrollY\":\"0\",\"blendType\":\"Screen\",\"switch\":\"1\",\"animated\":\"true\",\"frameWait\":\"480\",\"fade\":\"true\",\"fadeDuration\":\"480\",\"fadeMin\":\"0\",\"fadeMax\":\"255\"}","{\"name\":\"Shadow\",\"filename\":\"%2_%3\",\"order\":\"Behind Above Characters\",\"z\":\"1\",\"loop\":\"false\",\"lock\":\"{\\\"type\\\":\\\"Map\\\",\\\"eventId\\\":\\\"1\\\",\\\"shiftX\\\":\\\"0\\\",\\\"shiftY\\\":\\\"0\\\"}\",\"scrollX\":\"0\",\"scrollY\":\"0\",\"blendType\":\"Multiply\",\"switch\":\"0\",\"animated\":\"false\",\"frameWait\":\"0\",\"fade\":\"true\",\"fadeDuration\":\"480\",\"fadeMin\":\"50\",\"fadeMax\":\"255\"}","{\"name\":\"Doodads\",\"filename\":\"%2_%3\",\"order\":\"Behind Below Characters\",\"z\":\"1\",\"loop\":\"false\",\"lock\":\"{\\\"type\\\":\\\"Map\\\",\\\"eventId\\\":\\\"1\\\",\\\"shiftX\\\":\\\"0\\\",\\\"shiftY\\\":\\\"0\\\"}\",\"scrollX\":\"0\",\"scrollY\":\"0\",\"blendType\":\"Normal\",\"switch\":\"0\",\"animated\":\"false\",\"frameWait\":\"0\",\"fade\":\"false\",\"fadeDuration\":\"0\",\"fadeMin\":\"0\",\"fadeMax\":\"255\"}","{\"name\":\"Animated Doodads\",\"filename\":\"%2_%3%4\",\"order\":\"Behind Above Characters\",\"z\":\"2\",\"loop\":\"false\",\"lock\":\"{\\\"type\\\":\\\"Map\\\",\\\"eventId\\\":\\\"1\\\",\\\"shiftX\\\":\\\"0\\\",\\\"shiftY\\\":\\\"0\\\"}\",\"scrollX\":\"0\",\"scrollY\":\"0\",\"blendType\":\"Normal\",\"switch\":\"0\",\"animated\":\"true\",\"frameWait\":\"5\",\"fade\":\"false\",\"fadeDuration\":\"0\",\"fadeMin\":\"0\",\"fadeMax\":\"255\"}","{\"name\":\"Fog\",\"filename\":\"%1_%3\",\"order\":\"Above Weather\",\"z\":\"100\",\"loop\":\"true\",\"lock\":\"{\\\"type\\\":\\\"Map\\\",\\\"eventId\\\":\\\"1\\\",\\\"shiftX\\\":\\\"0\\\",\\\"shiftY\\\":\\\"0\\\"}\",\"scrollX\":\"5\",\"scrollY\":\"2\",\"blendType\":\"Multiply\",\"switch\":\"2\",\"animated\":\"false\",\"frameWait\":\"0\",\"fade\":\"true\",\"fadeDuration\":\"60\",\"fadeMin\":\"128\",\"fadeMax\":\"255\"}","{\"name\":\"Particle Player\",\"filename\":\"%1_%3%4\",\"order\":\"Above All Characters\",\"z\":\"0\",\"loop\":\"false\",\"lock\":\"{\\\"type\\\":\\\"Player\\\",\\\"eventId\\\":\\\"1\\\",\\\"shiftX\\\":\\\"-82\\\",\\\"shiftY\\\":\\\"-62\\\"}\",\"scrollX\":\"0\",\"scrollY\":\"0\",\"blendType\":\"Normal\",\"switch\":\"0\",\"animated\":\"true\",\"frameWait\":\"15\",\"fade\":\"true\",\"fadeDuration\":\"300\",\"fadeMin\":\"80\",\"fadeMax\":\"200\"}","{\"name\":\"Particle Event\",\"filename\":\"%1_%3\",\"order\":\"Above All Characters\",\"z\":\"0\",\"loop\":\"false\",\"lock\":\"{\\\"type\\\":\\\"Event\\\",\\\"eventId\\\":\\\"5\\\",\\\"shiftX\\\":\\\"-22\\\",\\\"shiftY\\\":\\\"-22\\\"}\",\"scrollX\":\"0\",\"scrollY\":\"0\",\"blendType\":\"Additive\",\"switch\":\"0\",\"animated\":\"true\",\"frameWait\":\"15\",\"fade\":\"true\",\"fadeDuration\":\"5\",\"fadeMin\":\"20\",\"fadeMax\":\"128\"}"]
 *
 * @help =============================================================================
 * • Changelogs
 * =============================================================================
 *   v1.1a - 06/01/2019
 *     - Fixed: Blinking issue with animated layer that is caused by the bitmap 
 *              that is not yet loaded.
 * 
 *   v1.1 - 04/01/2019 
 *     - Removed: Lock X to Map parameter.
 *     - Removed: Lock Y to Map parameter.
 *     - Changed: Layer Order parameter.
 *     - Added: Global Switch parameter.
 *     - Added: Layer Z parameter.
 *     - Added: Lock Position parameter.
 *     - Added: Layer Loop parameter.
 *     - Added: setEvent plugin command.
 *     - Added: setOpacity plugin command.
 *     - Added: setEvent plugin command.
 * 
 *   v1.0 - 01/01/2019
 *     - Initial release.
 * 
 * =============================================================================
 * • Map Notetag
 * =============================================================================
 *   <parallax: PRESETNAME, NAME[, MAXFRAME]>
 *   - Add a new layer to the map.
 *   - PRESETNAME: Preset Name in the Parallax Presets parameter.
 *   - NAME: Base name that will be used for parallax filename, replacing %3.
 *   - MAXFRAME: Only if the parallax is animated. Maximum frame.
 *   Example:
 *     The preset filename is %1_%3, and the notetag is <parallax: Preset, 
 *     testing>, and the map ID is 5, the actual filename will be 5_testing.
 * 
 * =============================================================================
 * • Plugin Commands
 * =============================================================================
 *   parallaxUtils setEvent PRESETNAME EVENTID
 *   - Set event ID to layer that has the PRESETNAME.
 *   Ex. parallaxUtils setEvent Particle Event 5
 * 
 *   parallaxUtils setOpacity PRESETNAME VALUE
 *   - Set layer opacity.
 *   - VALUE: 0 to 255.
 *   Ex. parallaxUtils setOpacity Doodads 128
 * 
 *   parallaxUtils setPosition PRESETNAME X Y
 *   - Set layer shift X and shift Y.
 */

/*~struct~presetSetting:
@param name
@text Preset Name
@desc Preset name.

@param filename
@text Parallax Filename
@desc Filename for this layer. %1 = Map ID, %2 = Parallax Name, %3 = Name Parameter, %4 = Frame Index
@default Map%1_%3

@param order
@text Layer Order
@desc Choose in which order the layer will be drawn.
@type select
@option Behind Parallax
@option Behind Tileset
@option Behind Below Characters
@option Behind Characters
@option Behind Above Characters
@option Above All Characters
@option Above Weather
@default Behind Below Characters
 
@param z
@text Layer Z
@desc If two or more layer has the same z value, it'll be determined by notetag order.
@type number
@min 0
@default 0

@param loop
@text Layer Loop
@desc Choose whether the layer will loop or not.
@type boolean
@default false

@param lock
@text Lock Position
@desc Choose where the layer will lock to.
@type struct<lockPosition>
@default {"type":"Map","eventId":"1","shiftX":"0","shiftY":"0"}

@param scrollX
@text Auto Scroll X
@desc Scroll X speed value. Only if Layer Loop is enabled.
@type number
@min -9999999
@default 0

@param scrollY
@text Auto Scroll Y
@desc Scroll Y speed value. Only if Layer Loop is enabled.
@type number
@min -9999999
@default 0

@param blendType
@text Blending Type
@type select
@option Normal
@option Additive
@option Multiply
@option Screen
@default Normal

@param switch
@text Enable Switch
@desc Switch for enabling this layer. 0/None = Always Enabled.
@type switch
@default 0

@param animated
@text Animated?
@desc Whether this layer will be animated or not.
@type boolean
@default false

@param frameWait
@text Animation Frame Wait
@desc Wait between each animation frame. Only if Animated is On.
@type number
@default 0

@param fade
@text Enable Fading
@desc When enabled, the opacity will change based on the fade duration.
@type boolean
@default false

@param fadeDuration
@text Fade Duration
@desc Fading duration.
@type number
@default 0

@param fadeMin
@text Fade Minimum Value
@desc Minimum opacity value for fading.
@type number
@min 0
@max 255
@default 0

@param fadeMax
@text Fade Maximum Value
@desc Maximum opacity value for fading.
@type number
@min 0
@max 255
@default 255
*/

/*~struct~lockPosition:
@param type
@text Lock Type
@desc When you choose Event and the event doesn't exist, this layer will be disabled.
@type select
@option Default
@option Map
@option Event
@option Player
@default Map

@param eventId
@text Lock Event ID
@desc Only for Event Lock Type.
@type number
@min 1
@default 1

@param shiftX
@text Shift X
@desc Shift X value.
@type number
@min -9999999
@default 0

@param shiftY
@text Shift Y
@desc Shift Y value.
@type number
@min -9999999
@default 0
*/

Dhoom.Parameters = PluginManager.parameters('DhoomParallaxUtils');
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

Dhoom.ParallaxUtils.globalSwitch = Dhoom.loadParam('Global Switch');
Dhoom.ParallaxUtils.presets = Dhoom.loadParam('Parallax Presets');

Dhoom.ParallaxUtils.getPresetIndex = function (presetName) {
    for (var i = 0; i < this.presets.length; i++) {
        if (this.presets[i].name.toLowerCase() === presetName.toLowerCase()) return i;
    }
};

Dhoom.ParallaxUtils.layerOrder = ['Behind Parallax', 'Behind Tileset', 'Behind Below Characters', 'Behind Characters', 'Behind Above Characters', 'Above All Characters', 'Above Weather']
Dhoom.ParallaxUtils.lockTypes = ['Default', 'Map', 'Event', 'Player'];
Dhoom.ParallaxUtils.blendTypes = ['Normal', 'Additive', 'Multiply', 'Screen'];

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// Game_Map
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
Dhoom.ParallaxUtils.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function (mapId) {
    Dhoom.ParallaxUtils.Game_Map_setup.call(this, mapId);
    this.setupParallaxUtils();
};

Game_Map.prototype.setupParallaxUtils = function () {
    this._parallaxUtils = [];
    var notedata = $dataMap.note.split(/[\r\n]+/);
    for (var n = 0; n < notedata.length; n++) {
        if (notedata[n].match(/<parallax:\s*(.+)>/i)) {
            var args = RegExp.$1.split(',');
            if (args.length > 1) {
                var preset = args[0].trim();
                var baseName = args[1].trim();
                var maxFrame = args[2] ? Number(args[2].trim()) : 1;
                this._parallaxUtils.push(new Game_ParallaxLayer(preset, baseName, maxFrame));
            }
        }
    }
};

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// Game_Interpreter
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
Dhoom.ParallaxUtils.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    Dhoom.ParallaxUtils.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command.toLowerCase() === 'parallaxutils') {
        var string = args.slice(1).join(" ");
        if (string.match(/(.+)\s(-?\d+)\s(-?\d+)/i)) {
            var name = RegExp.$1;
            switch (args[0].toLowerCase()) {
                case 'setposition':
                    var x = Number(RegExp.$2);
                    var y = Number(RegExp.$3);
                    $gameMap._parallaxUtils.forEach(function (obj) {
                        if (obj._presetName === name) obj.setPosition(x, y);
                    });
                    break;
            }
        } else if (string.match(/(.+)\s(\d+)/i)) {
            var name = RegExp.$1;
            switch (args[0].toLowerCase()) {
                case 'setevent':
                    var eventId = Number(RegExp.$2);
                    $gameMap._parallaxUtils.forEach(function (obj) {
                        if (obj._presetName === name) obj.setEventId(eventId);
                    });
                    break;
                case 'setopacity':
                    var opacity = Number(RegExp.$2);
                    $gameMap._parallaxUtils.forEach(function (obj) {
                        if (obj._presetName === name) obj.setOpacity(opacity);
                    });
            }
        }
    }
};

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// Game_ParallaxLayer
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
function Game_ParallaxLayer() {
    this.initialize.apply(this, arguments);
}

Game_ParallaxLayer.MAP_LOCK_TYPE = 1;
Game_ParallaxLayer.EVENT_LOCK_TYPE = 2;
Game_ParallaxLayer.PLAYER_LOCK_TYPE = 3;

Game_ParallaxLayer.prototype.initialize = function (presetName, baseName, maxFrame) {
    this._presetName = presetName;
    this._presetIndex = Dhoom.ParallaxUtils.getPresetIndex(presetName);
    this.setBaseName(baseName);
    this._sx = 0;
    this._sy = 0;
    this._frame = 0;
    this._frameDuration = 0;
    this._maxFrame = maxFrame || 1;
    this._opacity = 255;
    this._fadeOpacity = this.minFade();
    this._fadeDir = 1;
    this._eventId = this.preset().lock.eventId;
    this.setPosition(this.preset().lock.shiftY, this.preset().lock.shiftY);
};

Game_ParallaxLayer.prototype.preset = function () {
    return Dhoom.ParallaxUtils.presets[this._presetIndex];
};

Game_ParallaxLayer.prototype.setBaseName = function (name) {
    this._baseName = name;
};

Game_ParallaxLayer.prototype.isAnimated = function () {
    return this.preset().animated;
};

Game_ParallaxLayer.prototype.filename = function () {
    if (this.isAnimated()) this.updateFrame();
    return this.preset().filename.format($gameMap.mapId(), $gameMap._parallaxName, this._baseName, this._frame + 1);
};

Game_ParallaxLayer.prototype.blendType = function () {
    return this.preset().blendType;
};

Game_ParallaxLayer.prototype.setPosition = function (x, y) {
    this._shiftX = x;
    this._shiftY = y;
};

Game_ParallaxLayer.prototype.setEventId = function (eventId) {
    this._eventId = eventId;
};

Game_ParallaxLayer.prototype.isLoop = function () {
    return this.preset().loop;
};

Game_ParallaxLayer.prototype.lockType = function () {
    return Dhoom.ParallaxUtils.lockTypes.indexOf(this.preset().lock.type);
};

Game_ParallaxLayer.prototype.isMapLock = function () {
    return this.lockType() === Game_ParallaxLayer.MAP_LOCK_TYPE;
};

Game_ParallaxLayer.prototype.isEventLock = function () {
    return this.lockType() === Game_ParallaxLayer.EVENT_LOCK_TYPE;
};

Game_ParallaxLayer.prototype.isPlayerLock = function () {
    return this.lockType() === Game_ParallaxLayer.PLAYER_LOCK_TYPE;
};

Game_ParallaxLayer.prototype.shiftX = function () {
    return this._shiftX;
};

Game_ParallaxLayer.prototype.shiftY = function () {
    return this._shiftY;
};

Game_ParallaxLayer.prototype.getX = function () {
    if (this.isLoop()) return this.scrollX();
    if (this.isMapLock()) return this.mapX();
    if (this.isEventLock()) return this.eventX();
    if (this.isPlayerLock()) return this.playerX();
    return $gameMap.displayX() - this.shiftX();
};

Game_ParallaxLayer.prototype.scrollX = function () {
    this._sx += this.preset().scrollX;
    return this._sx;
};

Game_ParallaxLayer.prototype.mapX = function () {
    return $gameMap.displayX() * $gameMap.tileWidth() - this.shiftX();
};

Game_ParallaxLayer.prototype.eventX = function () {
    var event = $gameMap.event(this._eventId);
    if (event) return -(event.screenX() + this.shiftX());
    return $gameMap.displayX() - this.shiftX();
};

Game_ParallaxLayer.prototype.playerX = function () {
    return -($gamePlayer.screenX() + this.shiftX());
};

Game_ParallaxLayer.prototype.getY = function () {
    if (this.isLoop()) return this.scrollY();
    if (this.isMapLock()) return this.mapY();
    if (this.isEventLock()) return this.eventY();
    if (this.isPlayerLock()) return this.playerY();
    return $gameMap.displayY() - this.shiftY();
};

Game_ParallaxLayer.prototype.scrollY = function () {
    this._sy += this.preset().scrollY;
    return this._sy;
};

Game_ParallaxLayer.prototype.mapY = function () {
    return $gameMap.displayY() * $gameMap.tileHeight() - this.shiftY();
};

Game_ParallaxLayer.prototype.eventY = function () {
    var event = $gameMap.event(this._eventId);
    if (event) return -(event.screenY() - $gameMap.tileHeight() / 2 + this.shiftY());
    return $gameMap.displayY() - this.shiftY();
};

Game_ParallaxLayer.prototype.playerY = function () {
    return -($gamePlayer.screenY() - $gameMap.tileHeight() / 2 + this.shiftY());
};

Game_ParallaxLayer.prototype.layerOrder = function () {
    return Dhoom.ParallaxUtils.layerOrder.indexOf(this.preset().order);
};

Game_ParallaxLayer.prototype.getZ = function () {
    return this.preset().z;
};

Game_ParallaxLayer.prototype.isEnabled = function () {
    if (Dhoom.ParallaxUtils.globalSwitch && !$gameSwitches.value(Dhoom.ParallaxUtils.globalSwitch)) return false;
    if (this.preset().switch && !$gameSwitches.value(this.preset().switch)) return false;
    if (this.preset().filename.contains('%2') && !$gameMap._parallaxName) return false;
    if (this.isEventLock() && (!$gameMap.event(this._eventId) || $gameMap.event(this._eventId)._erased)) return false;
    return true;
};

Game_ParallaxLayer.prototype.isFading = function () {
    return this.preset().fade;
};

Game_ParallaxLayer.prototype.fadeDuration = function () {
    return this.preset().fadeDuration;
};

Game_ParallaxLayer.prototype.fadeSpeed = function () {
    return (this.maxFade() - this.minFade()) / (this.fadeDuration() / 2);
};

Game_ParallaxLayer.prototype.maxFade = function () {
    return this.preset().fadeMax * this._opacity / 255;
};

Game_ParallaxLayer.prototype.minFade = function () {
    return this.preset().fadeMin * this._opacity / 255;
};

Game_ParallaxLayer.prototype.setOpacity = function (value) {
    this._opacity = value;
    this._fadeOpacity = value;
};

Game_ParallaxLayer.prototype.opacity = function () {
    if (this.isFading()) this.updateFading();
    return this.isEnabled() ? (this.isFading() ? this._fadeOpacity : this._opacity) : 0;
};

Game_ParallaxLayer.prototype.updateFading = function () {
    if (this._fadeDir) {
        this._fadeOpacity += this.fadeSpeed();
        if (this._fadeOpacity >= this.maxFade()) {
            this._fadeDir = 0;
            this._fadeOpacity = this.maxFade();
        }
    } else {
        this._fadeOpacity -= this.fadeSpeed();
        if (this._fadeOpacity <= this.minFade()) {
            this._fadeDir = 1;
            this._fadeOpacity = this.minFade();
        }
    }
};

Game_ParallaxLayer.prototype.updateFrame = function () {
    this._frameDuration--;
    if (this._frameDuration <= 0) {
        this._frame++;
        if (this._frame >= this._maxFrame) this._frame = 0;
        this._frameDuration = this.preset().frameWait;
    }
};

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// Spriteset_Map
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
Dhoom.ParallaxUtils.Spriteset_Map_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function () {
    Dhoom.ParallaxUtils.Spriteset_Map_update.call(this);
    this.updateParallaxUtils();
};

Spriteset_Map.prototype.updateParallaxUtils = function () {
    this._parallaxUtils = this._parallaxUtils || [];
    $gameMap._parallaxUtils.forEach(function (obj, i) {
        var filename = obj.filename();
        if ((!this._parallaxUtils[i] && obj.isEnabled()) || (this._parallaxUtils[i] instanceof TilingSprite && this._parallaxUtils[i]._filename !== filename && !Graphics.isWebGL())) {
            if (this._parallaxUtils[i]) {
                this._parallaxUtils[i].parent.removeChild(this._parallaxUtils[i]);
            }
            var sprite = obj.isLoop() ? new TilingSprite() : new Sprite();
            sprite.move(0, 0, Graphics.width, Graphics.height);
            this._parallaxUtils[i] = sprite;
            this.addParallaxUtilsToParent(obj, sprite);
            sprite.blendMode = Dhoom.ParallaxUtils.blendTypes.indexOf(obj.blendType());
        }
        var sprite = this._parallaxUtils[i];
        if (sprite) {
            sprite.opacity = obj.opacity();
            if (sprite._filename !== filename) {                
                var bitmap = ImageManager.loadParallax(filename);
                if (bitmap.isReady()) {
                    sprite.bitmap = bitmap;
                    sprite._filename = filename;
                } else if (obj.isAnimated()) {
                    obj._frameDuration++;
                }
            }            
            if (sprite instanceof TilingSprite) {                
                sprite.origin.x = obj.getX();
                sprite.origin.y = obj.getY();
            } else {
                sprite.x = -obj.getX();
                sprite.y = -obj.getY();
            }
        }
    }, this);
};

Spriteset_Map.prototype.addParallaxUtilsToParent = function (setting, sprite) {
    switch (setting.layerOrder()) {
        case 0: // Behind Parallax
            this._baseSprite.addChildAt(sprite, this._baseSprite.children.indexOf(this._parallax));
            break;
        case 1: // Behind Tileset
            this._baseSprite.addChildAt(sprite, this._baseSprite.children.indexOf(this._tilemap));
            break;
        case 2: // Behind Below Characters
            sprite.z = 0.01 + setting.getZ() / 1000;
            this._tilemap.addChild(sprite);
            break;
        case 3: // Behind Characters
            sprite.z = 2 + setting.getZ() / 1000;
            this._tilemap.addChild(sprite);
            break;
        case 4: // Behind Above Characters
            sprite.z = 4 + setting.getZ() / 1000;
            this._tilemap.addChild(sprite);
            break;
        case 5: // Above All Characters
            this._baseSprite.addChild(sprite);
            break;
        case 6: // Above Weather
            this.addChild(sprite);
            break;
    }
};