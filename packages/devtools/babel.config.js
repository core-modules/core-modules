// Dependency root for current package.
const root = "./node_modules/@core-modules/devtools/node_modules"

// Plugin: Module Resolver.
// Provides default module resolvers. Allows packages to implement import
// shortcuts such as `require("@services/my-services.js").
const pluginModuleResolver = () => [
  root + "/babel-plugin-module-resolver", {
  "alias": {
    "@config": "./src/config",
    "@services": "./src/services",
    "@constants": "./src/constants"
  }
}]

module.exports = api => {
  api.cache(true)

  const plugins = [
    pluginModuleResolver()
  ]

  return { plugins }
}
