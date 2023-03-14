/// <reference path="../../node_modules/outsystems-ui/dist/OutSystemsUI.d.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace OverridePattern.Tabs {
    // Override OSUI Initialize method
    OutSystems.OSUI.Patterns.TabsAPI.Initialize = CustomInitialize;

    // My custom Initialize Tab method
    export function CustomInitialize(tabsId: string): any {
        const tabs = OutSystems.OSUI.Patterns.TabsAPI.GetTabsById(tabsId);

        const myTabs = new MyTabs(tabs);

        myTabs.build();

        return myTabs;
    }

    // My custom Tabs Class
    export class MyTabs {
        // OutSystems Submenu instance
        private _osuiTabs: OSFramework.Patterns.Tabs.ITabs

        constructor(tabs: OSFramework.Patterns.Tabs.ITabs) {
            this._osuiTabs = tabs;
        }

        private _keypressEventOverride(e: KeyboardEvent): void {
            let targetHeaderItemIndex;
            // Check oif target is content, to preventDefault and not change tabe on x arrow press
            //@ts-ignore
            const isContentTarget = e.target !== this._activeTabHeaderElement.selfElement;

            switch (e.key) {
                //@ts-ignore
                case OSFramework.OSUI.GlobalEnum.Keycodes.ArrowRight:
                    if (isContentTarget) {
                        return;
                    }
                    // If is right arrow, navigate to current active tabs + 1 (next item)
                    //@ts-ignore
                    targetHeaderItemIndex = this.configs.StartingTab + 1;
                    // To prevent triggerinh changeTab, if already on last item
                    //@ts-ignore
                    if (targetHeaderItemIndex < this.getChildItems(OSFramework.OSUI.Patterns.Tabs.Enum.ChildTypes.TabsHeaderItem).length) {
                        //@ts-ignore
                        this.changeTab(targetHeaderItemIndex, undefined, true);
                    }
                    break;
                //@ts-ignore
                case OSFramework.OSUI.GlobalEnum.Keycodes.ArrowLeft:
                    if (isContentTarget) {
                        return;
                    }
                    // If is left arrow, navigate to current active tabs - 1 (previous item)
                    //@ts-ignore
                    targetHeaderItemIndex = this.configs.StartingTab - 1;
                    // To prevent triggering changeTab, if already on first item
                    if (targetHeaderItemIndex >= 0) {
                        //@ts-ignore
                        this.changeTab(targetHeaderItemIndex, undefined, true);
                    }
                    break;
            }
            //@ts-ignore
            const targetHeaderItem = this.getChildByIndex(targetHeaderItemIndex, OSFramework.OSUI.Patterns.Tabs.Enum.ChildTypes.TabsHeaderItem);
            // Focus on the new activeHeader, after changeTab
            if (targetHeaderItem) {
                targetHeaderItem.setFocus();
            }
        }

        public build() {
            // Override Tabs keypress event 
            //@ts-ignore
            this._osuiTabs._handleKeypressEvent = this._keypressEventOverride;
            // build outsystems Submenu
            this._osuiTabs.build();
        }
    }
}
