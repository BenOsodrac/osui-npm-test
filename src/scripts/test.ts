/// <reference path="../../node_modules/outsystems-ui/dist/OutSystemsUI.d.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace MyOSUI.test {
    // Override OSUI Initialize method
    OutSystems.OSUI.Patterns.SidebarAPI.Initialize = CustomInitialize;

    // My custom Initialize Sidebar method
    export function CustomInitialize(sidebarId: string): any {
        const sidebar = OutSystems.OSUI.Patterns.SidebarAPI.GetSidebarById(sidebarId);

        const mySidebar = new MySidebar(sidebar);

        mySidebar.build();

        return mySidebar;
    }

    // My custom Sidebar Class
    export class MySidebar {
        // OutSystems Sidebar instance
        private _osuiSidebar: OSFramework.Patterns.Sidebar.ISidebar;

        constructor(sidebar: OSFramework.Patterns.Sidebar.ISidebar) {
            this._osuiSidebar = sidebar;
        }

        private _mySidebarOverlayClose(e: Event): void {
            require("OutSystems/ClientRuntime/Main").Public.FeedbackMessage.showFeedbackMessage("Overlay default event was prevented", 0, true, "", false);
        }

        public build() {
            // Override Sidebar Overlay event
            //@ts-ignore
            this._osuiSidebar._overlayClickCallback = this._mySidebarOverlayClose;
            // build outsystems Sidebar
            this._osuiSidebar.build();
        }
    }
}
