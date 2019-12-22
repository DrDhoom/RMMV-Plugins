//=============================================================================
// DhoomWeaponUpgrade.js
//=============================================================================
var Imported = Imported || {};
Imported.Dhoom_WeaponUpgrade = "2.1";

var Dhoom = Dhoom || {};
Dhoom.WeaponUpgrade = Dhoom.WeaponUpgrade || {};
/*:
 * @plugindesc Dhoom WeaponUpgrade v2.1 - 22/12/2019
 * @author DrDhoom - drd-workshop.blogspot.com
 * 
 * @param General
 * 
 * @param Default Upgrade Cost Formula
 * @desc Default cost formula for upgrade. a = actor, b = weapon, c = level.
 * @parent General
 * @default 100 * a + b.price * a / 2
 * 
 * @param Default Max Level
 * @desc Default max level for weapons.
 * @type number
 * @min 1
 * @parent General
 * @default 99
 * 
 * @param Default Growth Formula
 * @desc Default weapon parameters growth formula. a = actor, b = weapon, c = level.
 * @type struct<growthSetting>
 * @default {"mhp":"","mmp":"","atk":"b.params[2] + 10 * c","def":"","mat":"","mdf":"","agi":"","luk":""}
 * @parent General
 * 
 * @param Scene
 * 
 * @param Background
 * @desc Scene background. When empty/none, blurred map shot will be the background instead.
 * @type file
 * @dir img/system/
 * @parent Scene 
 * @default 
 * 
 * @param Gold Window
 * @desc Gold window setting. %1 = Current Gold, %2 = Currency Unit.
 * @type struct<windowSetting>
 * @default {"x":"480","y":"72","width":"336","height":"72","opacity":"255","padding":"12","background":"{\"filename\":\"\",\"x\":\"0\",\"y\":\"0\",\"opacity\":\"255\"}","text":"%1\\\\I[196]","style":"{\"name\":\"\",\"size\":\"32\",\"color\":\"#FFFFFF\",\"outlineWidth\":\"3\",\"outlineColor\":\"#000000\",\"bold\":\"false\",\"italic\":\"false\",\"align\":\"right\"}"}
 * @parent Scene 
 * 
 * @param Help Window
 * @desc Window for showing shop name and description.
 * @type struct<helpWindow>
 * @default {"x":"0","y":"0","width":"480","height":"144","opacity":"255","padding":"12","background":"{\"filename\":\"\",\"x\":\"0\",\"y\":\"0\",\"opacity\":\"255\"}","texts":"[\"{\\\"x\\\":\\\"0\\\",\\\"y\\\":\\\"0\\\",\\\"width\\\":\\\"456\\\",\\\"height\\\":\\\"28\\\",\\\"text\\\":\\\"%1 Lv.%3 ~ %4\\\",\\\"style\\\":\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"size\\\\\\\":\\\\\\\"28\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"#f38900\\\\\\\",\\\\\\\"outlineWidth\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"outlineColor\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"bold\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"italic\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"align\\\\\\\":\\\\\\\"center\\\\\\\"}\\\"}\",\"{\\\"x\\\":\\\"0\\\",\\\"y\\\":\\\"38\\\",\\\"width\\\":\\\"456\\\",\\\"height\\\":\\\"28\\\",\\\"text\\\":\\\"%2\\\",\\\"style\\\":\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"size\\\\\\\":\\\\\\\"28\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"#FFFFFF\\\\\\\",\\\\\\\"outlineWidth\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"outlineColor\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"bold\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"italic\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"align\\\\\\\":\\\\\\\"center\\\\\\\"}\\\"}\"]"}
 * @parent Scene
 * 
 * @param Actor Selection Window
 * @desc Window for selecting which actor's weapon to upgrade. %1 = Actor Name.
 * @type struct<windowSelectable>
 * @default {"x":"0","y":"144","width":"288","height":"480","opacity":"255","padding":"12","cols":"1","background":"{\"filename\":\"\",\"x\":\"0\",\"y\":\"0\",\"opacity\":\"255\"}","text":"%1","style":"{\"name\":\"\",\"size\":\"32\",\"color\":\"#FFFFFF\",\"outlineWidth\":\"3\",\"outlineColor\":\"#000000\",\"bold\":\"false\",\"italic\":\"false\",\"align\":\"left\"}"}
 * @parent Scene
 * 
 * @param Upgrade Window
 * @desc Window for showing weapon name, weapon level, upgrade cost, etc.
 * @type struct<upgradeWindow>
 * @default {"x":"288","y":"144","width":"528","height":"384","opacity":"255","padding":"12","background":"{\"filename\":\"\",\"x\":\"0\",\"y\":\"0\",\"opacity\":\"255\"}","texts":"[\"{\\\"x\\\":\\\"0\\\",\\\"y\\\":\\\"0\\\",\\\"width\\\":\\\"404\\\",\\\"height\\\":\\\"28\\\",\\\"text\\\":\\\"%1\\\",\\\"style\\\":\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"size\\\\\\\":\\\\\\\"28\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"#f38900\\\\\\\",\\\\\\\"outlineWidth\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"outlineColor\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"bold\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"italic\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"align\\\\\\\":\\\\\\\"left\\\\\\\"}\\\"}\",\"{\\\"x\\\":\\\"404\\\",\\\"y\\\":\\\"0\\\",\\\"width\\\":\\\"100\\\",\\\"height\\\":\\\"28\\\",\\\"text\\\":\\\"lv. %2\\\",\\\"style\\\":\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"size\\\\\\\":\\\\\\\"28\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"#f38900\\\\\\\",\\\\\\\"outlineWidth\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"outlineColor\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"bold\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"italic\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"align\\\\\\\":\\\\\\\"right\\\\\\\"}\\\"}\",\"{\\\"x\\\":\\\"0\\\",\\\"y\\\":\\\"32\\\",\\\"width\\\":\\\"252\\\",\\\"height\\\":\\\"28\\\",\\\"text\\\":\\\"Next Level\\\",\\\"style\\\":\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"size\\\\\\\":\\\\\\\"28\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"#FFFFFF\\\\\\\",\\\\\\\"outlineWidth\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"outlineColor\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"bold\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"italic\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"align\\\\\\\":\\\\\\\"left\\\\\\\"}\\\"}\",\"{\\\"x\\\":\\\"252\\\",\\\"y\\\":\\\"32\\\",\\\"width\\\":\\\"252\\\",\\\"height\\\":\\\"28\\\",\\\"text\\\":\\\"%3\\\",\\\"style\\\":\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"size\\\\\\\":\\\\\\\"28\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"#FFFFFF\\\\\\\",\\\\\\\"outlineWidth\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"outlineColor\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"bold\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"italic\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"align\\\\\\\":\\\\\\\"right\\\\\\\"}\\\"}\",\"{\\\"x\\\":\\\"0\\\",\\\"y\\\":\\\"70\\\",\\\"width\\\":\\\"252\\\",\\\"height\\\":\\\"28\\\",\\\"text\\\":\\\"Upgrade Cost\\\",\\\"style\\\":\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"size\\\\\\\":\\\\\\\"28\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"#FFFFFF\\\\\\\",\\\\\\\"outlineWidth\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"outlineColor\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"bold\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"italic\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"align\\\\\\\":\\\\\\\"left\\\\\\\"}\\\"}\",\"{\\\"x\\\":\\\"252\\\",\\\"y\\\":\\\"70\\\",\\\"width\\\":\\\"252\\\",\\\"height\\\":\\\"28\\\",\\\"text\\\":\\\"%4\\\\\\\\\\\\\\\\I[192]\\\",\\\"style\\\":\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"size\\\\\\\":\\\\\\\"28\\\\\\\",\\\\\\\"color\\\\\\\":\\\\\\\"#FFFFFF\\\\\\\",\\\\\\\"outlineWidth\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"outlineColor\\\\\\\":\\\\\\\"#000000\\\\\\\",\\\\\\\"bold\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"italic\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"align\\\\\\\":\\\\\\\"right\\\\\\\"}\\\"}\"]","stats":"{\"x\":\"0\",\"y\":\"108\",\"width\":\"504\",\"height\":\"28\",\"spacing\":\"10\",\"termText\":\"%1\",\"termStyle\":\"{\\\"name\\\":\\\"\\\",\\\"size\\\":\\\"28\\\",\\\"color\\\":\\\"#FFFFFF\\\",\\\"outlineWidth\\\":\\\"3\\\",\\\"outlineColor\\\":\\\"#000000\\\",\\\"bold\\\":\\\"false\\\",\\\"italic\\\":\\\"false\\\",\\\"align\\\":\\\"left\\\"}\",\"valueText\":\"%1\",\"valueStyle\":\"{\\\"name\\\":\\\"\\\",\\\"size\\\":\\\"28\\\",\\\"color\\\":\\\"#FFFFFF\\\",\\\"outlineWidth\\\":\\\"3\\\",\\\"outlineColor\\\":\\\"#000000\\\",\\\"bold\\\":\\\"false\\\",\\\"italic\\\":\\\"false\\\",\\\"align\\\":\\\"right\\\"}\"}"}
 * @parent Scene
 * 
 * @param Upgrade SE
 * @desc Sound effect that will be played when upgrading a weapon.
 * @type struct<audioSe>
 * @default {"name":"Upgrade Weapon SE","volume":"100","pitch":"100","pan":"0"}
 * @parent Scene
 * 
 * @param Shop
 * 
 * @param Shop Settings
 * @desc Setting for shops that'll be used.
 * @type struct<shopSetting>[]
 * @parent Shop
 * @default ["{\"name\":\"Jiji\",\"description\":\"Which one shall I sharpen?\\\\\\\\nIt's really cheap.\",\"min\":\"1\",\"max\":\"3\",\"cost\":\"c * 10\"}","{\"name\":\"Baba\",\"description\":\"I can do better than \\\\\\\\nthat old man.\",\"min\":\"3\",\"max\":\"10\",\"cost\":\"c * 1000\"}"]
 *
 * @help =============================================================================
 * • Introduction
 * =============================================================================
 *   YEP Item Core is NEEDED!
 * 
 *   This plugin is for upgrading actor's weapon with parameters growth formula.
 * 
 *   All text parameters support escape characters, just add double backslash
 *   before the code, for example \\I[25] \\C[4].
 * 
 * =============================================================================
 * • Weapon Notetags
 * =============================================================================
 *   <upgradeFormula TYPE: FORMULA>
 *   Set upgrade parameter growth formula.
 *   TYPE: mhp, mmp, atk, def, mat, mdf, agi, luk.
 *   FORMULA: a = actor, b = weapon, c = level.
 *            To get the weapon parameter, use b.params[TYPEID], where TYPEID
 *            is the index of the parameter, start from 0.
 * 
 *   <upgradeMaxLevel: NUMBER>
 *   Set weapon max level.
 * 
 *   <noUpgrade>
 *   Weapon that has this tag can't be upgraded.
 * 
 * =============================================================================
 * • Plugin Commands
 * =============================================================================
 *   WeaponUpgrade open SHOPNAME
 *   - Open weapon upgrade shop, with SHOPNAME as the shop setting. SHOPNAME is
 *     case-sensitive.
 * 
 *   WeaponUpgrade upgrade ACTORID
 *   - Upgrade ACTORID currently equipped weapon.
 */

/*~struct~growthSetting:
@param mhp
@text Max HP Growth Formula
@desc Leave empty if not used. a = actor, b = weapon, c = level.

@param mmp
@text Max MP Growth Formula
@desc Leave empty if not used. a = actor, b = weapon, c = level.

@param atk
@text Attack Growth Formula
@desc Leave empty if not used. a = actor, b = weapon, c = level.

@param def
@text Defense Growth Formula
@desc Leave empty if not used. a = actor, b = weapon, c = level.

@param mat
@text Magic Attack Growth Formula
@desc Leave empty if not used. a = actor, b = weapon, c = level.

@param mdf
@text Magic Defense Growth Formula
@desc Leave empty if not used. a = actor, b = weapon, c = level.

@param agi
@text Agility Growth Formula
@desc Leave empty if not used. a = actor, b = weapon, c = level.

@param luk
@text Luck Growth Formula
@desc Leave empty if not used. a = actor, b = weapon, c = level.
*/

/*~struct~audioSe:
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
*/

/*~struct~shopSetting:
@param name
@text Shop Name
@desc Shop name. Support escape characters.

@param description
@text Shop Description
@desc Shop description. Use \\n to add another line.

@param min
@text Shop Minimum Level Upgrade
@type number
@min 1

@param max
@text Shop Maximum Level Upgrade
@type number
@min 1

@param cost
@text Upgrade Cost Formula
@desc a = actor, b = weapon, c = level.
@default 100 * a
*/

/*~struct~weaponIds:
@param start
@text Base Weapon
@desc Weapon that can be upgraded, basically this is the level 1.
@type weapon

@param upgrades
@text Upgrade IDs
@desc Upgrades for the base weapon.
@type weapon[]
*/

/*~struct~armorIds:
@param start
@text Base Armor
@desc Armor that can be upgraded, basically this is the level 1.
@type armor

@param upgrades
@text Upgrade IDs
@desc Upgrades for the base armor.
@type armor[]
*/

/*~struct~windowSelectable:
@param x
@text X Position
@type number
@min -999999999
@default 0

@param y
@text Y Position
@type number
@min -999999999
@default 0

@param width
@text Window Width
@desc Window width
@default 1786
@type number
@min 32

@param height
@text Window Height
@desc Window height area
@default 797
@type number
@min 32

@param opacity
@text Window Opacity
@desc Window opacity
@default 0
@type number
@max 255

@param padding
@text Window Padding
@desc Window padding
@default 0
@type number
@min 0

@param cols
@text Max Column
@desc Max item column.
@type number
@min 1
@default 4

@param background
@text Window Background
@desc Window background.
@default 
@type struct<imageSetting>

@param text
@text Text Format
@desc %1 = Data. Support escape character.
@default %1

@param style
@text Text Style
@type struct<FontStyle>
*/

/*~struct~helpWindow:
@param x
@text X Position
@type number
@min -999999999
@default 0

@param y
@text Y Position
@type number
@min -999999999
@default 0

@param width
@text Window Width
@desc Window width
@default 1786
@type number
@min 32

@param height
@text Window Height
@desc Window height area
@default 797
@type number
@min 32

@param opacity
@text Window Opacity
@desc Window opacity
@default 0
@type number
@max 255

@param padding
@text Window Padding
@desc Window padding
@default 0
@type number
@min 0

@param background
@text Window Background
@desc Window background.
@default 
@type struct<imageSetting>

@param texts
@text Window Texts
@desc Support escape character. %1 = Shop Name, %2 = Shop Description, %3 = Min Level, %4 = Max Level.
@type struct<textSetting>[]
@default
*/

/*~struct~upgradeWindow:
@param x
@text X Position
@type number
@min -999999999
@default 0

@param y
@text Y Position
@type number
@min -999999999
@default 0

@param width
@text Window Width
@desc Window width
@default 1786
@type number
@min 32

@param height
@text Window Height
@desc Window height area
@default 797
@type number
@min 32

@param opacity
@text Window Opacity
@desc Window opacity
@default 0
@type number
@max 255

@param padding
@text Window Padding
@desc Window padding
@default 0
@type number
@min 0

@param background
@text Window Background
@desc Window background.
@default 
@type struct<imageSetting>

@param texts
@text Window Texts
@desc Support escape character. %1 = Weapon Name, %2 = Current Level, %3 = Next Level, %4 = Upgrade Cost
@type struct<textSetting>[]
@default 

@param stats
@text Weapon Upgrade Stats
@desc When a stat has no difference than the next upgrade, it won't be drawn.
@type struct<statsSetting>
*/

/*~struct~statsSetting:
@param x
@text Start X Position
@type number
@min -999999999
@default 0

@param y
@text Start Y Position
@type number
@min -999999999
@default 0

@param width
@text Width
@type number
@min 4

@param height
@text Height
@type number
@min 4

@param spacing
@text Spacing
@desc Spacing between each line.
@type number

@param termText
@text Term Text Format
@desc %1 = Term

@param termStyle
@text Term Text Style
@type struct<FontStyle>

@param valueText
@text Value Text Format
@desc %1 = Value

@param valueStyle
@text Value Text Style
@type struct<FontStyle>
*/

/*~struct~windowSetting:
@param x
@text X Position
@type number
@min -999999999
@default 0

@param y
@text Y Position
@type number
@min -999999999
@default 0

@param width
@text Window Width
@desc Window width
@default 1786
@type number
@min 32

@param height
@text Window Height
@desc Window height area
@default 797
@type number
@min 32

@param opacity
@text Window Opacity
@desc Window opacity
@default 0
@type number
@max 255

@param padding
@text Window Padding
@desc Window padding
@default 0
@type number
@min 0

@param background
@text Window Background
@desc Window background.
@default 
@type struct<imageSetting>

@param text
@text Text Format
@desc %1 = Data. Support escape character.
@default %1

@param style
@text Text Style
@type struct<FontStyle>
*/

/*~struct~imageSetting:
@param filename
@text Filename
@type file
@dir img/system/

@param x
@text X Position
@type number
@min -999999999
@default 0

@param y
@text Y Position
@type number
@min -999999999
@default 0

@param opacity
@text Opacity
@type number
@min 0
@max 255
@default 255
*/

/*~struct~textSetting:
@param x
@text X Position
@type number
@min -999999999
@default 0

@param y
@text Y Position
@type number
@min -999999999
@default 0

@param width
@text Width
@type number
@min 4

@param height
@text Height
@type number
@min 4

@param text
@text Text Format
@desc %1 = Data 1, %2 = Data 2,...

@param style
@text Text Style
@type struct<FontStyle>
*/

/*~struct~FontStyle:
@param name
@text Font Name
@desc Font name, leave empty if you want to use the default font.
@default 

@param size
@text Font Size
@desc Font size
@default 32
@type number
@min 1

@param color
@text Font Color
@desc Font color
@default #FFFFFF

@param outlineWidth
@text Font Outline Width
@desc Font outline width
@default 1
@type number

@param outlineColor
@text Font Outline Color
@desc Font outline color
@default #000000

@param bold
@text Font Bold
@desc Font bold
@default false
@type boolean

@param italic
@text Font Italic
@desc Font italic
@default false
@type boolean

@param align
@text Text Alignment
@desc Text alignment
@default center
@type select
@option left
@option center
@option right
*/

Dhoom.Parameters = $plugins.filter(function (obj) { return obj.description.match(/Dhoom WeaponUpgrade/) })[0].parameters;
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

Dhoom.WeaponUpgrade.defaultCost = Dhoom.loadParam('Default Upgrade Cost Formula');
Dhoom.WeaponUpgrade.defaultGrowthFormula = Dhoom.loadParam('Default Growth Formula');
Dhoom.WeaponUpgrade.defaultMaxLevel = Dhoom.loadParam("Default Max Level");

Dhoom.WeaponUpgrade.sceneBackground = Dhoom.loadParam('Background');
Dhoom.WeaponUpgrade.goldWindow = Dhoom.loadParam('Gold Window');
Dhoom.WeaponUpgrade.helpWindow = Dhoom.loadParam('Help Window');
Dhoom.WeaponUpgrade.actorWindow = Dhoom.loadParam('Actor Selection Window');
Dhoom.WeaponUpgrade.upgradeWindow = Dhoom.loadParam('Upgrade Window');
Dhoom.WeaponUpgrade.upgradeSE = Dhoom.loadParam('Upgrade SE');

Dhoom.WeaponUpgrade.shopSettings = Dhoom.loadParam('Shop Settings');

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// Dhoom.WeaponUpgrade
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
Dhoom.WeaponUpgrade.paramTypes = ['mhp', 'mmp', 'atk', 'def', 'mat', 'mdf', 'agi', 'luk'];
Dhoom.WeaponUpgrade.isValid = function (weapon) {
    return DataManager.isWeapon(weapon) && !weapon.noUpgrade;
};

Dhoom.WeaponUpgrade.isWeaponLevelMax = function (weapon) {
    if (this.isValid(weapon)) {
        var max = this.defaultMaxLevel;
        if (weapon.upgradeMaxLevel) max = weapon.upgradeMaxLevel;
        return (weapon.weaponLevel || 1) === max;
    }
    return false;
};

Dhoom.WeaponUpgrade.getUpgradeCost = function (actor, weapon, level) {
    var formula = this.defaultCost;
    if (this.currentShop && this.currentShop.cost) formula = this.currentShop.cost;
    var a = actor;
    var b = weapon;
    var c = level;
    var result = 0;
    try {
        result = eval(formula);
    } catch (e) {
        console.warn("Upgrade Cost Formula Error!");
        console.warn(e);
        result = 0;
    }
    return result;
};

Dhoom.WeaponUpgrade.getShop = function (name) {
    for (var i = 0; i < this.shopSettings.length; i++) {
        if (this.shopSettings[i].name === name) return this.shopSettings[i];
    };
};

Dhoom.WeaponUpgrade.shopCanUpgrade = function (level) {
    if (this.currentShop) return level >= this.currentShop.min && level < this.currentShop.max;
    return true;
};

Dhoom.WeaponUpgrade.upgradeWeapon = function (actor, weapon, amount) {
    var types = this.paramTypes;
    if (this.isValid(weapon)) {
        for (var i = 0; i < amount; i++) {
            if (!this.isWeaponLevelMax(weapon)) {
                var level = (weapon.weaponLevel || 1) + 1;
                weapon.weaponLevel = level;
                for (var j = 0; j < 7; j++) {
                    var type = types[j];
                    weapon.params[j] = this.getUpgradedStat(type, actor, weapon, level);
                }
            }
        }
    }
};

Dhoom.WeaponUpgrade.getUpgradedStat = function (type, actor, weapon, level) {
    var a = actor;
    var b = weapon;
    var c = level;
    var types = this.paramTypes;
    var formula = "";
    if (this.defaultGrowthFormula[type]) formula = this.defaultGrowthFormula[type];
    if (b.upgradeFormula[type]) formula = b.upgradeFormula[type];
    if (formula.trim()) {
        try {
            return Math.floor(eval(formula));
        } catch (e) {
            console.warn('Upgrade Formula Error!');
            console.warn(e);
        }
    }
    return b.params[types.indexOf(type)];
};

if (Imported.YEP_ItemCore) {
    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // Bitmap
    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    Dhoom.WeaponUpgrade.Bitmap_initialize = Bitmap.prototype.initialize;
    Bitmap.prototype.initialize = function (width, height) {
        Dhoom.WeaponUpgrade.Bitmap_initialize.call(this, width, height);
        this.fontBold = false;
    };

    Dhoom.WeaponUpgrade.Bitmap_makeFontNameText = Bitmap.prototype._makeFontNameText;
    Bitmap.prototype._makeFontNameText = function () {
        if (this.fontBold) return 'Bold ' + this.fontSize + 'px ' + this.fontFace;
        return Dhoom.WeaponUpgrade.Bitmap_makeFontNameText.call(this);
    };

    Bitmap.prototype.changeTextStyle = function (style) {
        this.fontFace = style.name.length > 0 ? style.name : 'GameFont';
        this.fontSize = style.size;
        this.textColor = style.color;
        this.outlineWidth = style.outlineWidth;
        this.outlineColor = style.outlineColor;
        this.fontBold = style.bold;
        this.fontItalic = style.italic;
    };

    Dhoom.WeaponUpgrade.Bitmap_drawTextOutline = Bitmap.prototype._drawTextOutline;
    Bitmap.prototype._drawTextOutline = function (text, tx, ty, maxWidth) {
        if (this.outlineWidth === 0) return;
        Dhoom.WeaponUpgrade.Bitmap_drawTextOutline.call(this, text, tx, ty, maxWidth);
    };

    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // DataManager
    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    Dhoom.WeaponUpgrade.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!Dhoom.WeaponUpgrade.DataManager_isDatabaseLoaded.call(this)) return false;
        if (!Dhoom.WeaponUpgrade.isWeaponUpgradeInitialized) {
            this.DhoomWeaponUpgradeInitWeapons();
            Dhoom.WeaponUpgrade.isWeaponUpgradeInitialized = true;
        }
        return true;
    };

    DataManager.DhoomWeaponUpgradeInitWeapons = function () {
        var group = $dataWeapons;
        for (var i = 1; i < group.length; i++) {
            var object = group[i];
            if (object) {
                object.weaponLevel = object.weaponLevel || 1;
                object.upgradeFormula = {};
                var notedata = object.note.split(/[\r\n]+/);
                for (var n = 0; n < notedata.length; n++) {
                    if (notedata[n].match(/<upgradeformula (\w+):\s*(.+)>/i)) {
                        if (Dhoom.WeaponUpgrade.paramTypes.contains(RegExp.$1.trim().toLowerCase()))
                            object.upgradeFormula[RegExp.$1.trim().toLowerCase()] = RegExp.$2.trim();
                    }
                    if (notedata[n].match(/<upgrademaxlevel:\s*(\d+)>/i)) {
                        object.upgradeMaxLevel = Number(RegExp.$1);
                    }
                    if (notedata[n].match(/<noupgrade>/i)) {
                        object.noUpgrade = true;
                        object.weaponLevel = undefined;
                    }
                }
            }
        }
    };

    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // Game_Interpreter
    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    Dhoom.WeaponUpgrade.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        Dhoom.WeaponUpgrade.Game_Interpreter_pluginCommand.call(this, command, args);
        if (command.toLowerCase() === 'weaponupgrade') {
            switch (args[0].toLowerCase()) {
                case 'open':
                    var name = args.slice(1).join(" ");
                    var shop = Dhoom.WeaponUpgrade.getShop(name);
                    if (shop) {
                        Dhoom.WeaponUpgrade.currentShop = shop;
                        SceneManager.push(Scene_WeaponUpgrade);
                    }
                    break;
                case 'upgrade':
                    var actorId = Number(args[1]);
                    Dhoom.WeaponUpgrade.upgradeWeapon($gameActors.actor(actorId), $gameActors.actor(actorId).equips()[0], 1);
                    break;
            }
        }
    };

    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // Window_WeaponUpBase
    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    function Window_WeaponUpBase() {
        this.initialize.apply(this, arguments);
    }

    Window_WeaponUpBase.prototype = Object.create(Window_Base.prototype);
    Window_WeaponUpBase.prototype.constructor = Window_WeaponUpBase;

    Window_WeaponUpBase.prototype.initialize = function (setting) {
        this._setting = setting;
        Window_Base.prototype.initialize.call(this, this.setting().x, this.setting().y, this.setting().width, this.setting().height);
        this.opacity = this.setting().opacity;
        this.createBackground();
    };

    Window_WeaponUpBase.prototype.setting = function () {
        return this._setting;
    };

    Window_WeaponUpBase.prototype.standardPadding = function () {
        return this.setting().padding;
    };

    Window_WeaponUpBase.prototype.createBackground = function () {
        var setting = this.setting().background;
        this._background = new Sprite();
        this._background.bitmap = ImageManager.loadSystem(setting.filename);
        this._background.x = setting.x;
        this._background.y = setting.y;
        this._background.opacity = setting.opacity;
        this.addChildToBack(this._background);
    };

    Window_WeaponUpBase.prototype.resetFontSettings = function () {
        Window_Base.prototype.resetFontSettings.call(this);
        if (this.setting().style) this.contents.changeTextStyle(this.setting().style);
    };

    Window_WeaponUpBase.prototype.drawFormattedText = function (data, x, y, width, height, setting) {
        setting = setting || this.setting();
        var tempSetting = this._setting;
        this._setting = setting;
        var style = setting.style;
        var text = setting.text.format.apply(setting.text, data);
        text = this.convertEscapeCharacters(text);
        text = this.convertEscapeCharacters(text);
        var texts = text.split("\x1bn");
        texts.forEach(function (text) {
            this.resetFontSettings();
            var tw = this.calculateTextWidth(text);
            var textState = {};
            textState.x = 0;
            textState.y = 0;
            textState.left = 0;
            textState.text = text;
            textState.index = 0;
            var th = this.calcTextHeight(textState, false);
            var tx = 0;
            if (style.align === 'center') {
                tx = (width - tw) / 2;
            } else if (style.align === 'right') {
                tx = width - tw;
            }
            var ty = (height - th) / 2;
            this.drawTextEx(text, x + tx, y + ty);
            y += height;
        }, this);
        this._setting = tempSetting;
    };

    Window_WeaponUpBase.prototype.calculateTextWidth = function (text) {
        var textState = {};
        textState.x = 0;
        textState.y = 0;
        textState.left = 0;
        textState.text = text;
        textState.index = 0;
        var result = 0;
        while (textState.index < textState.text.length) {
            switch (textState.text[textState.index]) {
                case '\x1b':
                    switch (this.obtainEscapeCode(textState)) {
                        case 'C':
                            this.changeTextColor(this.textColor(this.obtainEscapeParam(textState)));
                            break;
                        case 'I':
                            this.obtainEscapeParam(textState);
                            result += Window_Base._iconWidth + 4;
                            break;
                        case '{':
                            this.makeFontBigger();
                            break;
                        case '}':
                            this.makeFontSmaller();
                            break;
                    }
                    break;
                default:
                    result += this.contents.measureTextWidth(textState.text[textState.index]);
                    textState.index++;
                    break;
            }
        }
        return result;
    };

    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // Window_WeaponUpSelectable
    //-----------------------------------------------------------------------------
    // Help
    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    function Window_WeaponUpSelectable() {
        this.initialize.apply(this, arguments);
    }

    Window_WeaponUpSelectable.prototype = Object.create(Window_Selectable.prototype);
    Window_WeaponUpSelectable.prototype.constructor = Window_WeaponUpSelectable;

    Window_WeaponUpSelectable.prototype.initialize = function (setting) {
        this._setting = setting;
        Window_Selectable.prototype.initialize.call(this, this.setting().x, this.setting().y, this.setting().width, this.setting().height);
        this.opacity = this.setting().opacity;
        this.createBackground();
    };

    Window_WeaponUpSelectable.prototype.setting = function () {
        return this._setting;
    };

    Window_WeaponUpSelectable.prototype.standardPadding = function () {
        return this.setting().padding;
    };

    Window_WeaponUpSelectable.prototype.maxCols = function () {
        return this.setting().cols;
    };

    Window_WeaponUpSelectable.prototype.createBackground = function () {
        var setting = this.setting().background;
        this._background = new Sprite();
        this._background.bitmap = ImageManager.loadSystem(setting.filename);
        this._background.x = setting.x;
        this._background.y = setting.y;
        this._background.opacity = setting.opacity;
        this.addChildToBack(this._background);
    };

    Window_WeaponUpSelectable.prototype.resetFontSettings = function () {
        Window_Selectable.prototype.resetFontSettings.call(this);
        this.contents.changeTextStyle(this.setting().style);
    };

    Window_WeaponUpSelectable.prototype.drawFormattedText = function (data, x, y, width, height) {
        var style = this.setting().style;
        var text = this.setting().text.format.apply(this.setting().text, data);
        text = this.convertEscapeCharacters(text);
        text = this.convertEscapeCharacters(text);
        this.resetFontSettings();
        var tw = this.calculateTextWidth(text);
        var textState = {};
        textState.x = 0;
        textState.y = 0;
        textState.left = 0;
        textState.text = text;
        textState.index = 0;
        var th = this.calcTextHeight(textState, false);
        var tx = 0;
        if (style.align === 'center') {
            tx = (width - tw) / 2;
        } else if (style.align === 'right') {
            tx = width - tw;
        }
        var ty = (height - th) / 2;
        this.drawTextEx(text, x + tx, y + ty);
    };

    Window_WeaponUpSelectable.prototype.calculateTextWidth = function (text) {
        var textState = {};
        textState.x = 0;
        textState.y = 0;
        textState.left = 0;
        textState.text = text;
        textState.index = 0;
        var result = 0;
        while (textState.index < textState.text.length) {
            switch (textState.text[textState.index]) {
                case '\x1b':
                    switch (this.obtainEscapeCode(textState)) {
                        case 'C':
                            this.changeTextColor(this.textColor(this.obtainEscapeParam(textState)));
                            break;
                        case 'I':
                            this.obtainEscapeParam(textState);
                            result += Window_Base._iconWidth + 4;
                            break;
                        case '{':
                            this.makeFontBigger();
                            break;
                        case '}':
                            this.makeFontSmaller();
                            break;
                    }
                    break;
                default:
                    result += this.contents.measureTextWidth(textState.text[textState.index]);
                    textState.index++;
                    break;
            }
        }
        return result;
    };

    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // Window_WeaponUpGold
    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    function Window_WeaponUpGold() {
        this.initialize.apply(this, arguments);
    }

    Window_WeaponUpGold.prototype = Object.create(Window_WeaponUpBase.prototype);
    Window_WeaponUpGold.prototype.constructor = Window_WeaponUpGold;

    Window_WeaponUpGold.prototype.initialize = function (setting) {
        Window_WeaponUpBase.prototype.initialize.call(this, setting);
        this.refresh();
    };

    Window_WeaponUpGold.prototype.refresh = function () {
        this.contents.clear();
        var data = [$gameParty.gold(), TextManager.currencyUnit];
        this.drawFormattedText(data, 0, 0, this.contents.width, this.contents.height);
    };

    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // Window_WeaponUpActor
    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    function Window_WeaponUpActor() {
        this.initialize.apply(this, arguments);
    }

    Window_WeaponUpActor.prototype = Object.create(Window_WeaponUpSelectable.prototype);
    Window_WeaponUpActor.prototype.constructor = Window_WeaponUpActor;

    Window_WeaponUpActor.prototype.maxItems = function () {
        return $gameParty.members().length;
    };

    Window_WeaponUpActor.prototype.actor = function () {
        return $gameParty.members()[this.index()];
    };

    Window_WeaponUpActor.prototype.drawItem = function (index) {
        var rect = this.itemRect(index);
        var actor = $gameParty.members()[index];
        var data = [actor.name()];
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawFormattedText(data, rect.x, rect.y, rect.width, rect.height);
    };

    Window_WeaponUpActor.prototype.updateHelp = function () {
        this.setHelpWindowItem(this.actor());
    };

    Window_WeaponUpActor.prototype.isCommandEnabled = function (index) {
        var actor = $gameParty.members()[index];
        if (!actor) return false;
        var weapon = actor.equips()[0];
        return Dhoom.WeaponUpgrade.isValid(weapon) && !Dhoom.WeaponUpgrade.isWeaponLevelMax(weapon) && Dhoom.WeaponUpgrade.shopCanUpgrade(weapon.weaponLevel) && $gameParty.gold() >= Dhoom.WeaponUpgrade.getUpgradeCost(actor, weapon, weapon.weaponLevel + 1);
    };

    Window_WeaponUpActor.prototype.isCurrentItemEnabled = function () {
        return this.isCommandEnabled(this.index());
    };

    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // Window_WeaponUpgrade
    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    function Window_WeaponUpgrade() {
        this.initialize.apply(this, arguments);
    }

    Window_WeaponUpgrade.prototype = Object.create(Window_WeaponUpBase.prototype);
    Window_WeaponUpgrade.prototype.constructor = Window_WeaponUpgrade;

    Window_WeaponUpgrade.prototype.setItem = function (actor) {
        if (actor !== this._actor) {
            this._actor = actor;
            this.refresh();
        }
    };

    Window_WeaponUpgrade.prototype.clear = function () {
        this.setItem(null);
    };

    Window_WeaponUpgrade.prototype.refresh = function () {
        this.contents.clear();
        if (!this._actor) return;
        var weapon = this._actor.equips()[0];
        var name = weapon ? weapon.name : "";
        var level = "-";
        var next = "-";
        var cost = "-";
        if (Dhoom.WeaponUpgrade.isValid(weapon)) {
            level = weapon.weaponLevel;
            next = Dhoom.WeaponUpgrade.isWeaponLevelMax(weapon) ? "MAX" : weapon.weaponLevel + 1;
            cost = Dhoom.WeaponUpgrade.isWeaponLevelMax(weapon) ? "-" : Dhoom.WeaponUpgrade.getUpgradeCost(this._actor, weapon, weapon.weaponLevel + 1);
            if (!Dhoom.WeaponUpgrade.isWeaponLevelMax(weapon) && !Dhoom.WeaponUpgrade.shopCanUpgrade(weapon.weaponLevel)) {
                next = 'Not Available';
                cost = 'Not Available';
            }
        }
        var data = [name, level, next, cost];
        this.setting().texts.forEach(function (setting) {
            this.drawFormattedText(data, setting.x, setting.y, setting.width, setting.height, setting);
        }, this);
        if (Dhoom.WeaponUpgrade.isValid(weapon) && !Dhoom.WeaponUpgrade.isWeaponLevelMax(weapon) && Dhoom.WeaponUpgrade.shopCanUpgrade(weapon.weaponLevel)) {
            var sx = this.setting().stats.x;
            var sy = this.setting().stats.y;
            var sw = this.setting().stats.width;
            var sh = this.setting().stats.height;
            var th = sh;
            if (this.setting().stats.termStyle.fontSize && this.setting().stats.termStyle.fontSize > th)
                th = this.setting().stats.termStyle.fontSize;
            if (this.setting().stats.valueStyle.fontSize && this.setting().stats.valueStyle.fontSize > th)
                th = this.setting().stats.valueStyle.fontSize;
            var types = Dhoom.WeaponUpgrade.paramTypes;
            for (var i = 0; i < 8; i++) {
                var upgrade = Dhoom.WeaponUpgrade.getUpgradedStat(types[i], this._actor, weapon, next);
                var value = upgrade - weapon.params[i];
                if (value !== 0) {
                    var setting = { text: this.setting().stats.termText, style: this.setting().stats.termStyle };
                    this.drawFormattedText([TextManager.param(i)], sx, sy, sw, th, setting);
                    setting = { text: this.setting().stats.valueText, style: this.setting().stats.valueStyle };
                    this.drawFormattedText([value > 0 ? "+%1".format(value) : value], sx, sy, sw, th, setting);
                    sy += th + this.setting().stats.spacing;
                }
            }
        }
    };

    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // Window_WeaponUpHelp
    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    function Window_WeaponUpHelp() {
        this.initialize.apply(this, arguments);
    }

    Window_WeaponUpHelp.prototype = Object.create(Window_WeaponUpBase.prototype);
    Window_WeaponUpHelp.prototype.constructor = Window_WeaponUpHelp;

    Window_WeaponUpHelp.prototype.refresh = function () {
        this.contents.clear();
        var shop = Dhoom.WeaponUpgrade.currentShop;
        var data = [shop.name, shop.description, shop.min, shop.max];
        this.setting().texts.forEach(function (setting) {
            this.drawFormattedText(data, setting.x, setting.y, setting.width, setting.height, setting);
        }, this);
    };

    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // Scene_WeaponUpgrade
    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    function Scene_WeaponUpgrade() {
        this.initialize.apply(this, arguments);
    }

    Scene_WeaponUpgrade.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_WeaponUpgrade.prototype.constructor = Scene_WeaponUpgrade;

    Scene_WeaponUpgrade.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createGoldWindow();
        this.createHelpWindow();
        this.createUpgradeWindow();
        this.createActorWindow();
    };

    Scene_WeaponUpgrade.prototype.createBackground = function () {
        Scene_MenuBase.prototype.createBackground.call(this);
        if (Dhoom.WeaponUpgrade.sceneBackground) this._backgroundSprite.bitmap = ImageManager.loadSystem(Dhoom.WeaponUpgrade.sceneBackground);
    };

    Scene_WeaponUpgrade.prototype.createGoldWindow = function () {
        this._goldWindow = new Window_WeaponUpGold(Dhoom.WeaponUpgrade.goldWindow);
        this.addChild(this._goldWindow);
    };

    Scene_WeaponUpgrade.prototype.createHelpWindow = function () {
        this._helpWindow = new Window_WeaponUpHelp(Dhoom.WeaponUpgrade.helpWindow);
        this._helpWindow.refresh();
        this.addChild(this._helpWindow);
    };

    Scene_WeaponUpgrade.prototype.createUpgradeWindow = function () {
        this._upgradeWindow = new Window_WeaponUpgrade(Dhoom.WeaponUpgrade.upgradeWindow);
        this.addChild(this._upgradeWindow);
    };

    Scene_WeaponUpgrade.prototype.createActorWindow = function () {
        this._actorWindow = new Window_WeaponUpActor(Dhoom.WeaponUpgrade.actorWindow);
        this._actorWindow.setHandler('ok', this.onActorOk.bind(this));
        this._actorWindow.setHandler('cancel', this.popScene.bind(this));
        this._actorWindow.setHelpWindow(this._upgradeWindow);
        this._actorWindow.refresh();
        this._actorWindow.select(0);
        this._actorWindow.activate();
        this.addChild(this._actorWindow);
    };

    Scene_WeaponUpgrade.prototype.update = function () {
        Scene_MenuBase.prototype.update.call(this);
        if (this._seBuffer && this._seBuffer.isReady() && !this._seBuffer.isPlaying()) this.endSE();
    };

    Scene_WeaponUpgrade.prototype.onActorOk = function () {
        this.startSE();
    };

    Scene_WeaponUpgrade.prototype.startSE = function () {
        AudioManager.playSe(Dhoom.WeaponUpgrade.upgradeSE);
        this._seBuffer = AudioManager._seBuffers[AudioManager._seBuffers.length - 1];
    };

    Scene_WeaponUpgrade.prototype.endSE = function () {
        this._seBuffer = undefined;
        var actor = this._actorWindow.actor();
        var weapon = actor.equips()[0];
        Dhoom.WeaponUpgrade.upgradeWeapon(actor, actor.equips()[0], 1);
        $gameParty.loseGold(Dhoom.WeaponUpgrade.getUpgradeCost(actor, weapon, weapon.weaponLevel));
        this._goldWindow.refresh();
        this._actorWindow.refresh();
        this._upgradeWindow.refresh();
        this._actorWindow.activate();
    };
} else {
    console.error('You need to use YEP Item Core for this plugin to work.');
}
