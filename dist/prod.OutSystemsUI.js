"use strict";
var MyOSUI;
(function (MyOSUI) {
    var test;
    (function (test) {
        OutSystems.OSUI.Patterns.SidebarAPI.Initialize = CustomInitialize;
        function CustomInitialize(sidebarId) {
            const sidebar = OutSystems.OSUI.Patterns.SidebarAPI.GetSidebarById(sidebarId);
            const mySidebar = new MySidebar(sidebar);
            mySidebar.build();
            return mySidebar;
        }
        test.CustomInitialize = CustomInitialize;
        class MySidebar {
            constructor(sidebar) {
                this._osuiSidebar = sidebar;
            }
            _mySidebarOverlayClose(e) {
                require("OutSystems/ClientRuntime/Main").Public.FeedbackMessage.showFeedbackMessage("Overlay default event was prevented", 0, true, "", false);
            }
            build() {
                this._osuiSidebar._overlayClickCallback = this._mySidebarOverlayClose;
                this._osuiSidebar.build();
            }
        }
        test.MySidebar = MySidebar;
    })(test = MyOSUI.test || (MyOSUI.test = {}));
})(MyOSUI || (MyOSUI = {}));
