"use strict";
var OverridePattern;
(function (OverridePattern) {
    var Tabs;
    (function (Tabs) {
        OutSystems.OSUI.Patterns.TabsAPI.Initialize = CustomInitialize;
        function CustomInitialize(tabsId) {
            const tabs = OutSystems.OSUI.Patterns.TabsAPI.GetTabsById(tabsId);
            const myTabs = new MyTabs(tabs);
            myTabs.build();
            return myTabs;
        }
        Tabs.CustomInitialize = CustomInitialize;
        class MyTabs {
            constructor(tabs) {
                this._osuiTabs = tabs;
            }
            _keypressEventOverride(e) {
                let targetHeaderItemIndex;
                const isContentTarget = e.target !== this._activeTabHeaderElement.selfElement;
                switch (e.key) {
                    case OSFramework.OSUI.GlobalEnum.Keycodes.ArrowRight:
                        if (isContentTarget) {
                            return;
                        }
                        targetHeaderItemIndex = this.configs.StartingTab + 1;
                        if (targetHeaderItemIndex < this.getChildItems(OSFramework.OSUI.Patterns.Tabs.Enum.ChildTypes.TabsHeaderItem).length) {
                            this.changeTab(targetHeaderItemIndex, undefined, true);
                        }
                        break;
                    case OSFramework.OSUI.GlobalEnum.Keycodes.ArrowLeft:
                        if (isContentTarget) {
                            return;
                        }
                        targetHeaderItemIndex = this.configs.StartingTab - 1;
                        if (targetHeaderItemIndex >= 0) {
                            this.changeTab(targetHeaderItemIndex, undefined, true);
                        }
                        break;
                }
                const targetHeaderItem = this.getChildByIndex(targetHeaderItemIndex, OSFramework.OSUI.Patterns.Tabs.Enum.ChildTypes.TabsHeaderItem);
                if (targetHeaderItem) {
                    targetHeaderItem.setFocus();
                }
            }
            build() {
                this._osuiTabs._handleKeypressEvent = this._keypressEventOverride;
                this._osuiTabs.build();
            }
        }
        Tabs.MyTabs = MyTabs;
    })(Tabs = OverridePattern.Tabs || (OverridePattern.Tabs = {}));
})(OverridePattern || (OverridePattern = {}));
