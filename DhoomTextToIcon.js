//=============================================================================
// DhoomTextToIcon.js
//=============================================================================

/*:
 * @plugindesc Draw icon instead of text. Version 1.0
 * @author DrDhoom
 *
 * @param Text and Icon
 * @desc Specify which text converted into which icon. [[Text, Icon Index], [Text, Icon Index], ...]
 * @default []
 *
 * @param Active Scene
 * @desc In which scenes this script will be applied? If Empty, it'll be applied to all scene. [Scene, Scene, ...]
 * @default []
 *
 * @help This plugin does not provide plugin commands.
 */

(function() {

    var params = PluginManager.parameters('DhoomTextToIcon');
    var txtIconArray = eval(params['Text and Icon'] || '[]');
    var txtScene = eval(params['Active Scene'] || '[]');

    var _dhoom_txticon_wndbase_drawtext = 
	Window_Base.prototype.drawText;
    Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
    	var sceneIncluded = false;
    	if (txtScene.length > 0){
    		txtScene.some(function(entry){
    			if (SceneManager._scene instanceof entry){
    				sceneIncluded = true;
    			};
    		});
    	} else {
    		sceneIncluded = true;
    	};
    	if (sceneIncluded){
    		var iconIndexText = false;
    		txtIconArray.some(function(entry) {
			    if (entry[0] === text){
			    	iconIndexText = entry[1];
			    };
			});
			if (iconIndexText){
				this.drawIcon(iconIndexText, x, y);
			} else {
				_dhoom_txticon_wndbase_drawtext.call(this, text, x, y, maxWidth, align); 
			};			
    	} else {
    		_dhoom_txticon_wndbase_drawtext.call(this, text, x, y, maxWidth, align); 
    	};
    };
})();
