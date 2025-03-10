sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend(
    "com.rrsolutions.myportfolio.controller.BaseController",
    {
      getModel: function (sName) {
        return this.getView().getModel(sName);
      },
      setModel: function (oModel, sName) {
        this.getView().setModel(oModel, sName);
      },
      getLanguage: function () {
        return sap.ui
          .getCore()
          .getConfiguration()
          .getLanguage()
          .split("-")[0]
          .toUpperCase();
      },
    }
  );
});
