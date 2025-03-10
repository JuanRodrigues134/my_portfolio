sap.ui.define(
  [
    "com/rrsolutions/myportfolio/controller/BaseController",
    "sap/ui/core/Fragment",
    "sap/m/library",
    "com/rrsolutions/myportfolio/model/models",
    "sap/ui/model/json/JSONModel",
    "com/rrsolutions/myportfolio/modules/storage/Storage",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, Fragment, library, models, JSONModel, Storage) {
    "use strict";

    const URLHelper = library.URLHelper;
    const oStorage = new Storage();
    return BaseController.extend(
      "com.rrsolutions.myportfolio.controller.Home",
      {
        onInit: function () {
          const sLanguage = this.getLanguage();
          const oViewModel = new JSONModel({
            isDarkMode: false,
            language: sLanguage,
          });
          this.setModel(oViewModel, "viewModel");
        },
        /**
         * @override
         */
        onAfterRendering() {
          this._setTheme(oStorage.getVariant("theme"));
        },
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
          const { id, name, url } = oSource
            .getBindingContext("user")
            .getObject();
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
          const sSelectedLanguage =
            this.byId("idSlctLanguage").getSelectedKey();
          const oUserModel = this.getModel("user");
          const sJsonPath = "model/user/user_" + sSelectedLanguage + ".json";
          this.setLanguage(sSelectedLanguage);
          oUserModel.loadData(sJsonPath);
          oUserModel.refresh();
          this._oLanguageList.close();
        },
        onPressCloseLanguage: function () {
          this._oLanguageList.close();
        },
        onPressChangeTheme: function (sTheme) {
          this._setTheme(sTheme);
        },
        _setTheme: function (sTheme) {
          const oViewModel = this.getModel("viewModel");
          oViewModel.setProperty("/isDarkMode", sTheme.includes("dark"));
          sap.ui.getCore().getConfiguration().setTheme(sTheme);
          oStorage.setVariant("theme", sTheme);
        },
        onPressOpenLinks: async function () {
          const oView = this.getView();
          this._oActionFragment ??= await Fragment.load({
            id: oView.getId(),
            name: "com.rrsolutions.myportfolio.view.fragments.Header.MobileLinks",
            controller: this,
          });
          oView.addContent(this._oActionFragment);
          this._oActionFragment.openBy(this.byId("idButtonLinks"));
        },
      }
    );
  }
);
