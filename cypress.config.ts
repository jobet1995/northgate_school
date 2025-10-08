import { defineConfig } from "cypress";
import * as fs from "fs";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // Log when test run starts
      on("before:run", (details) => {
        console.log("Starting Cypress test run:", details);
      });

      // Log when test run completes
      on("after:run", (results) => {
        console.log("Cypress test run completed:", results);
      });

      // Log before each spec file runs
      on("before:spec", (spec) => {
        console.log("Running spec file:", spec.name);
      });

      // Log after each spec file completes
      on("after:spec", (spec, results) => {
        console.log("Spec file completed:", spec.name, "Results:", results);
      });

      // Register custom tasks
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },

        table(message) {
          console.table(message);
          return null;
        },

        // Example: Create a task to read files
        readFile(filename) {
          if (fs.existsSync(filename)) {
            return fs.readFileSync(filename, "utf8");
          }
          return null;
        },
      });

      // Return the config
      return config;
    },
  },
});
