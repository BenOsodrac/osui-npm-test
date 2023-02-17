/*!
OutSystems UI 2.15.0
Website:
 • https://www.outsystems.com/outsystems-ui
GitHub:
 • https://github.com/OutSystems/outsystems-ui
*/ 
"use strict";
var MyOSUI;
(function (MyOSUI) {
    var test;
    (function (test) {
        class MyTest {
            constructor() {
                console.log('Hello');
            }
        }
        test.MyTest = MyTest;
    })(test = MyOSUI.test || (MyOSUI.test = {}));
})(MyOSUI || (MyOSUI = {}));
