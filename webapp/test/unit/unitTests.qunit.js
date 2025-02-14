/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comrrsolutions/my_portfolio/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
