// jest.config.cjs
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
    preset: "ts-jest", // use ts-jest for transforming TypeScript
    testEnvironment: "jsdom", // use jsdom environment for browser-like testing
    setupFilesAfterEnv: ["./jest.setup.ts"], // Include the TS setup file
    // Transform TS/TSX files with ts-jest
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
        // Optionally, for static assets (CSS, images), use a transformer stub:
        "^.+\\.(css|less|sass|scss|png|jpg|gif|svg)$": "jest-transform-stub"
    },
    // Optionally map path aliases if defined in tsconfig.json (e.g., "@/components/*")
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
        prefix: "<rootDir>/"
    }),
    // File extensions Jest will recognize.
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    // Define which files Jest should consider as test files.
    testMatch: ["**/__tests__/**/*.(ts|tsx)", "**/?(*.)+(spec|test).(ts|tsx)"]
};
