// @ts-ignore
/// <reference path="../../node_modules/outsystems-ui/dist/OutSystemsUI.d.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace MyOSUI.ExtendExample {
    const _sidebarMap = new Map<string, any>();

    // Override OSUI Create method
    OutSystems.OSUI.Patterns.SidebarAPI.Create = CustomCreate;
    // Override OSUI Initialize method
    OutSystems.OSUI.Patterns.SidebarAPI.Initialize = CustomInitialize;


    // My custom Create Sidebar method
    export function CustomCreate(sidebarId: string, configs: string): any {

        const _newSidebar = new MySidebar(sidebarId, JSON.parse(configs));


        _sidebarMap.set(sidebarId, _newSidebar);

        return _newSidebar;
    }


    // My custom Initialize Sidebar method
    export function CustomInitialize(sidebarId: string): any {
        const mySidebar = _sidebarMap.get(sidebarId);

        mySidebar.build();

        return mySidebar;
    }

    // My custom Sidebar Class
    // @ts-ignore
    export class MySidebar extends OSUIFramework.Patterns.Sidebar.Sidebar {

        constructor(sidebarId: string, configs: string) {
            super(sidebarId, configs);

        }

        private _mySidebarOverlayClose(e: Event): void {
            require("OutSystems/ClientRuntime/Main").Public.FeedbackMessage.showFeedbackMessage("Overlay default event was prevented", 0, true, "", false);
        }

        public build() {
            // Override Sidebar Overlay event
            //@ts-ignore
            this._overlayClickCallback = this._mySidebarOverlayClose;
            // build outsystems Sidebar
            super.build();
        }
    }
}
