"use strict";
var MyOSUI;
(function (MyOSUI) {
    var ExtendExample;
    (function (ExtendExample) {
        const _sidebarMap = new Map();
        OutSystems.OSUI.Patterns.SidebarAPI.Create = CustomCreate;
        OutSystems.OSUI.Patterns.SidebarAPI.Initialize = CustomInitialize;
        function CustomCreate(sidebarId, configs) {
            const _newSidebar = new MySidebar(sidebarId, JSON.parse(configs));
            _sidebarMap.set(sidebarId, _newSidebar);
            return _newSidebar;
        }
        ExtendExample.CustomCreate = CustomCreate;
        function CustomInitialize(sidebarId) {
            const mySidebar = _sidebarMap.get(sidebarId);
            mySidebar.build();
            return mySidebar;
        }
        ExtendExample.CustomInitialize = CustomInitialize;
        class MySidebar extends OSUIFramework.Patterns.Sidebar.Sidebar {
            constructor(sidebarId, configs) {
                super(sidebarId, configs);
            }
            _mySidebarOverlayClose(e) {
                require("OutSystems/ClientRuntime/Main").Public.FeedbackMessage.showFeedbackMessage("Overlay default event was prevented", 0, true, "", false);
            }
            build() {
                this._overlayClickCallback = this._mySidebarOverlayClose;
                super.build();
            }
        }
        ExtendExample.MySidebar = MySidebar;
    })(ExtendExample = MyOSUI.ExtendExample || (MyOSUI.ExtendExample = {}));
})(MyOSUI || (MyOSUI = {}));
