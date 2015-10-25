//=============================================================================
// TitleExitCommand.js
//=============================================================================

/*:
 * @plugindesc Add exit command in Scene Title.
 * @author DrDhoom
 *
 * @param Exit Command Text
 * @desc Command text
 * @default Exit
 *
 * @help This plugin does not provide plugin commands.
 */

(function() {

    var params = PluginManager.parameters('TitleExitCommand');
    var exitText = String(params['Exit Command Text'] || 'Exit');
    var _window_TitleCommand_makeCommandList = 
	Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
	_window_TitleCommand_makeCommandList.call(this);        
        this.addCommand(exitText,   'exit');
    };

    var _scene_Title_createCommandWindow = 
	Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
	_scene_Title_createCommandWindow.call(this);    	
    	this._commandWindow.setHandler('exit',  this.commandExit.bind(this));
    };

    Scene_Title.prototype.commandExit = function() {
    	this._commandWindow.close();
     	SceneManager.terminate();
    };

})();



