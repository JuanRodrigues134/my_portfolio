sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/GroupHeaderListItem",
    "sap/uxap/BlockBase",
    "sap/m/Text",
    "sap/ui/core/CustomData",
    "sap/ui/core/Fragment",
    "sap/m/library",
    "com/rrsolutions/myportfolio/model/models",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    Controller,
    GroupHeaderListItem,
    BlockBase,
    Text,
    CustomData,
    Fragment,
    mobileLibrary,
    models
  ) {
    "use strict";

    const URLHelper = mobileLibrary.URLHelper;

    return Controller.extend("com.rrsolutions.myportfolio.controller.Home", {
      onInit: function () {},

      /**
       * @override
       */
      onAfterRendering() {},

      onCvLinkPress: async function () {
        const oView = this.getView();
        const oLink = this.byId("idCvLink");
        this._oFragment ??= await Fragment.load({
          id: oView.getId(),
          name: "com.rrsolutions.myportfolio.view.fragments.SelectLanguagePopover",
          controller: this,
        });
        oView.addContent(this._oFragment);
        this._oFragment.openBy(oLink);
      },

      onDownloadCv: function (sLanguage) {
        const sFileName = `JUAN RABELO ${sLanguage}.pdf`;
        const sFilePath = jQuery.sap.getModulePath(
          "com.rrsolutions.myportfolio",
          "/assets/" + sFileName
        );
        const oLink = document.createElement("a");

        oLink.href = sFilePath;
        oLink.download = sFileName;
        document.body.appendChild(oLink);
        oLink.click();
        document.body.removeChild(oLink);
      },

      onMyAppGenericTilePress: function (oEvent) {
        const oSource = oEvent.getSource();
        const { id, name, url } = oSource.getBindingContext("user").getObject();
        URLHelper.redirect(url, true);
      },

      onPressChangeLanguage: async function () {
        const oView = this.getView();
        this._oLanguageList ??= await Fragment.load({
          id: oView.getId(),
          name: "com.rrsolutions.myportfolio.view.fragments.SelectLanguageList",
          controller: this,
        });
        oView.addContent(this._oLanguageList);
        this._oLanguageList.open();
      },

      onPressSelectLanguage: function () {
        const sSelectedLanguage = this.byId("idSlctLanguage");
        sap.ui.getCore().setLanguage(sSelectedLanguage);
        models.loadUserModel();
        this.getView().getModel("user").refresh();
      },
    });
  }
);
