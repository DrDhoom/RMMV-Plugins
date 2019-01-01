//=============================================================================
// DhoomParallaxUtils.js
//=============================================================================
var Imported = Imported || {};
Imported.Dhoom_ParallaxUtils = true;

var Dhoom = Dhoom || {};
Dhoom.ParallaxUtils = Dhoom.ParallaxUtils || {};
/*:
 * @plugindesc Dhoom ParallaxUtils v1.0 - 01/01/2019
 * @author DrDhoom - drd-workshop.blogspot.com
 * 
 * @param Parallax Presets
 * @desc Preset settings.
 * @type struct<presetSetting>[]
 * @default ["{\"name\":\"Animated Light\",\"filename\":\"%2_%3%4\",\"z\":\"100\",\"lockX\":\"true\",\"lockY\":\"true\",\"scrollX\":\"0\",\"scrollY\":\"0\",\"blendType\":\"Screen\",\"switch\":\"1\",\"animated\":\"true\",\"frameWait\":\"480\",\"fade\":\"true\",\"fadeDuration\":\"480\",\"fadeMin\":\"0\",\"fadeMax\":\"255\"}","{\"name\":\"Shadow\",\"filename\":\"%2_%3\",\"z\":\"0\",\"lockX\":\"true\",\"lockY\":\"true\",\"scrollX\":\"0\",\"scrollY\":\"0\",\"blendType\":\"Multiply\",\"switch\":\"0\",\"animated\":\"false\",\"frameWait\":\"0\",\"fade\":\"true\",\"fadeDuration\":\"480\",\"fadeMin\":\"50\",\"fadeMax\":\"255\"}","{\"name\":\"Doodads\",\"filename\":\"%2_%3\",\"z\":\"1\",\"lockX\":\"true\",\"lockY\":\"true\",\"scrollX\":\"0\",\"scrollY\":\"0\",\"blendType\":\"Normal\",\"switch\":\"0\",\"animated\":\"false\",\"frameWait\":\"0\",\"fade\":\"false\",\"fadeDuration\":\"0\",\"fadeMin\":\"0\",\"fadeMax\":\"255\"}","{\"name\":\"Animated Doodads\",\"filename\":\"%2_%3%4\",\"z\":\"1\",\"lockX\":\"true\",\"lockY\":\"true\",\"scrollX\":\"0\",\"scrollY\":\"0\",\"blendType\":\"Normal\",\"switch\":\"0\",\"animated\":\"true\",\"frameWait\":\"5\",\"fade\":\"false\",\"fadeDuration\":\"0\",\"fadeMin\":\"0\",\"fadeMax\":\"255\"}","{\"name\":\"Fog\",\"filename\":\"%1_%3\",\"z\":\"100\",\"lockX\":\"false\",\"lockY\":\"false\",\"scrollX\":\"5\",\"scrollY\":\"2\",\"blendType\":\"Multiply\",\"switch\":\"2\",\"animated\":\"false\",\"frameWait\":\"0\",\"fade\":\"true\",\"fadeDuration\":\"60\",\"fadeMin\":\"128\",\"fadeMax\":\"255\"}"]
 *
 * @help =============================================================================
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
 */

/*~struct~presetSetting:
@param name
@text Preset Name
@desc Preset name.

@param filename
@text Parallax Filename
@desc Filename for this layer. %1 = Map ID, %2 = Parallax Name, %3 = Name Parameter, %4 = Frame Index
@default %1_%3
 
@param z
@text Layer Order
@desc Tileset Layer = 0, Character Layer = 50, 100 = Weather
@type number
@min -9999999
@default -100

@param lockX
@text Lock X to Map
@desc Whether to lock X to the map or not.
@type boolean
@default true

@param lockY
@text Lock Y to Map
@desc Whether to lock Y to the map or not.
@type boolean
@default true

@param scrollX
@text Auto Scroll X
@desc Scroll X speed value.
@type number
@min -9999999
@default 0

@param scrollY
@text Auto Scroll Y
@desc Scroll Y speed value.
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

Dhoom.ParallaxUtils.presets = Dhoom.loadParam('Parallax Presets');

Dhoom.ParallaxUtils.getPresetIndex = function (presetName) {
    for (var i = 0; i < this.presets.length; i++) {
        if (this.presets[i].name.toLowerCase() === presetName.toLowerCase()) return i;
    }
};

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
// Game_ParallaxLayer
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
function Game_ParallaxLayer() {
    this.initialize.apply(this, arguments);
}

Game_ParallaxLayer.prototype.initialize = function (presetName, baseName, maxFrame) {
    this._presetName = presetName;
    this._presetIndex = Dhoom.ParallaxUtils.getPresetIndex(presetName);
    this.setBaseName(baseName);
    this._sx = 0;
    this._sy = 0;
    this._frame = 0;
    this._frameDuration = 0;
    this._maxFrame = maxFrame || 1;
    this._opacity = this.isFading() ? this.minFade() : 255;
    this._fadeDir = 1;
};

Game_ParallaxLayer.prototype.preset = function () {
    return Dhoom.ParallaxUtils.presets[this._presetIndex];
};

Game_ParallaxLayer.prototype.setBaseName = function (name) {
    this._baseName = name;
};

Game_ParallaxLayer.prototype.filename = function () {
    this.updateFrame();
    return this.preset().filename.format($gameMap.mapId(), $gameMap._parallaxName, this._baseName, this._frame + 1);
};

Game_ParallaxLayer.prototype.blendType = function () {
    return this.preset().blendType;
};

Game_ParallaxLayer.prototype.isXLocked = function () {
    return this.preset().lockX;
};

Game_ParallaxLayer.prototype.isYLocked = function () {
    return this.preset().lockY;
};

Game_ParallaxLayer.prototype.isTiling = function () {
    return !this.isXLocked() && !this.isYLocked();
};

Game_ParallaxLayer.prototype.scrollX = function () {
    if (this.isXLocked()) return $gameMap.displayX() * $gameMap.tileWidth();
    this._sx += this.preset().scrollX;
    return this._sx;
};

Game_ParallaxLayer.prototype.scrollY = function () {
    if (this.isYLocked()) return $gameMap.displayY() * $gameMap.tileHeight();
    this._sy += this.preset().scrollY;
    return this._sy;
};

Game_ParallaxLayer.prototype.layerOrder = function () {
    return this.preset().z;
};

Game_ParallaxLayer.prototype.isEnabled = function () {
    return !this.preset().switch || $gameSwitches.value(this.preset().switch);
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
    return this.preset().fadeMax;
};

Game_ParallaxLayer.prototype.minFade = function () {
    return this.preset().fadeMin;
};

Game_ParallaxLayer.prototype.opacity = function () {
    if (this.isFading()) this.updateFading();
    return this.isEnabled() ? this._opacity : 0;
};

Game_ParallaxLayer.prototype.updateFading = function () {
    if (this._fadeDir) {
        this._opacity += this.fadeSpeed();
        if (this._opacity >= this.maxFade()) {
            this._fadeDir = 0;
            this._opacity = this.maxFade();
        }
    } else {
        this._opacity -= this.fadeSpeed();
        if (this._opacity <= this.minFade()) {
            this._fadeDir = 1;
            this._opacity = this.minFade();
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
            if (obj.isTiling()) {
                var sprite = new TilingSprite();
            } else {
                var sprite = new Sprite();
            }
            sprite.move(0, 0, Graphics.width, Graphics.height);
            this._parallaxUtils[i] = sprite;
            if (obj.layerOrder() < 0) {
                this._baseSprite.addChildAt(sprite, this._baseSprite.children.indexOf(this._tilemap));
            } else if (obj.layerOrder() >= 100) {
                this.addChild(sprite);
            } else if (obj.layerOrder() >= 50) {
                this._baseSprite.addChild(sprite);
            } else {
                sprite.z = 0.01 + obj.layerOrder() / 55;
                this._tilemap.addChild(sprite);
            }
            sprite.blendMode = ['Normal', 'Additive', 'Multiply', 'Screen'].indexOf(obj.blendType());
        }
        var sprite = this._parallaxUtils[i];
        if (sprite) {
            if (sprite._filename !== filename) {
                sprite.bitmap = ImageManager.loadParallax(filename);
                sprite._filename = filename;
            }
            sprite.opacity = obj.opacity();
            if (sprite instanceof TilingSprite) {
                sprite.origin.x = obj.scrollX();
                sprite.origin.y = obj.scrollY();
            } else {
                sprite.x = -obj.scrollX();
                sprite.y = -obj.scrollY();
            }
        }
    }, this);
};