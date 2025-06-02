// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// ⚠️ Adicione essas linhas para modificar as extensões e transformer
config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");

const assetExts = config.resolver.assetExts.filter(ext => ext !== "svg");
const sourceExts = [...config.resolver.sourceExts, "svg"];

config.resolver.assetExts = assetExts;
config.resolver.sourceExts = sourceExts;

// ⚠️ Preserve o NativeWind (e Gluestack) funcionando
module.exports = withNativeWind(config, { input: "./global.css" });
