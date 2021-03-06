import {getState} from "@system/index";
import {defaultWindowProps, IWindowConstructorProps} from "@components/Window";
import {actions as WindowsManagerActions} from "@components/WindowsManager";
import {ILayoutStateElements} from "@components/Layout/interfaces";
import {IAppInfo} from "@interfaces";

export function open(content, options:IWindowConstructorProps = defaultWindowProps, callback = function(windowId){}) {
	WindowsManagerActions.open({
		options: options,
		content: content,
		callback: callback,
	})
}

export function getContentState(state?): ILayoutStateElements{
	if( !state ) state = getState();
	return state.Layout.window;
}

export function getOpenedApps(): {windowId: string, appInfo: IAppInfo}[] {
	return getState().WindowsManager.opened.map(function(window){
		return {
			windowId: window.id,
			appInfo: window.appInfo,
		}
	});
}