sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/GroupHeaderListItem",
    "sap/uxap/BlockBase",
    "sap/m/Text",
    "sap/ui/core/CustomData",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, GroupHeaderListItem, BlockBase, Text, CustomData) {
    "use strict";

    return Controller.extend("com.rrsolutions.myportfolio.controller.Home", {
      onInit: function () {},

      /**
       * @override
       */
      onAfterRendering() {},

      getGroupHeader: function (oGroup) {
        return new GroupHeaderListItem({
          title: oGroup.key,
        });
      },
    });
  }
);
