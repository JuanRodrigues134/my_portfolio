sap.ui.define(
  ["sap/ui/base/ManagedObject", "sap/ui/util/Storage"],
  function (ManagedObject, Storage) {
    "use strict";

    return ManagedObject.extend(
      "com.rrsolutions.myportfolio.modules.storage.Storage",
      {
        constructor: function () {},

        _getStorage: function () {
          if (!Storage.isSupported()) {
            throw new Error("Storage is not supported");
          }
          return new Storage(Storage.Type.local, "port_store");
        },

        setVariant: function (key, value) {
          this._getStorage().put(key, JSON.stringify(value));
        },

        getVariant: function (key) {
          return JSON.parse(this._getStorage().get(key));
        },

        clear: function () {
          this._getStorage().clear();
        },
      }
    );
  }
);
