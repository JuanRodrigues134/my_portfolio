sap.ui.define(
  ["sap/ui/model/json/JSONModel", "sap/ui/Device", "sap/ui/core/Core"],
  /**
   * provide app-view type models (as in the first "V" in MVVC)
   *
   * @param {typeof sap.ui.model.json.JSONModel} JSONModel
   * @param {typeof sap.ui.Device} Device
   *
   * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
   */
  function (JSONModel, Device, Core) {
    "use strict";

    return {
      createDeviceModel: function () {
        var oModel = new JSONModel(Device);
        oModel.setDefaultBindingMode("OneWay");
        return oModel;
      },

      loadUserModel: function () {
        const sLanguage = Core.getConfiguration().getLanguage().split("-")[0];
        const sJsonPath = "model/user_" + sLanguage + ".json";
        const oUserModel = new JSONModel();
        oUserModel.loadData(sJsonPath).catch(function () {
          oUserModel.loadData("model/user.json");
        });
        return oUserModel;
      },
    };
  }
);
