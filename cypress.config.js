const { defineConfig } = require("cypress");

module.exports = defineConfig({
  firefoxGcInterval: {
    runMode: 3,
    openMode: null
  },

  
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:4200',
    experimentalSessionAndOrigin: true,
  },

});
