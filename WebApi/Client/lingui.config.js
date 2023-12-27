const { formatter } = require('@lingui/format-json');

module.exports = {
    rootDir: "./",
    locales: ["en-GL", "en-GB", "da-DK", "nb-NO", "sv-SE", "es-ES", "de-DE", "pl-PL", "fr-FR", "fi-FI"],
    sourceLocale: "en-GB",
    catalogs: [
        {
            path: "./src/locales/{locale}",
            include: ["./src"],
            exclude: ["**/node_modules/**"]
        }
    ],
    format: formatter({style: "minimal"}),
    compileNamespace: "es"
}
