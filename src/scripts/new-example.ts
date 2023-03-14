// // @ts-ignore
// /// <reference path="../../node_modules/outsystems-ui/dist/OutSystemsUI.d.ts" />

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// namespace MyOSUI.ExtendExample {
//     // My custom Sidebar Class
//     // @ts-ignore
//     export class MySidebar extends OSFramework.OSUI.Patterns.Sidebar.Sidebar {

//         constructor(sidebarId: string, configs: JSON) {
//             super(sidebarId, configs);

//         }

//         private _mySidebarOverlayClose(e: Event): void {
//             require("OutSystems/ClientRuntime/Main").Public.FeedbackMessage.showFeedbackMessage("Overlay default event was prevented", 0, true, "", false);
//         }

//         public build() {
//             // build outsystems Sidebar
//             super.build();
//             // Override Sidebar Overlay event
//             //@ts-ignore
//             this._clickOutsideToClose = true;
//             //@ts-ignore
//             this._eventOverlayClick = this._mySidebarOverlayClose;
//             //@ts-ignore
//             OSFramework.OSUI.Event.GlobalEventManager.Instance.addHandler(OSFramework.OSUI.Event.Type.BodyOnClick, this._eventOverlayClick);
//         }
//     }
// }