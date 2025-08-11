const fs = require("fs");
const path = require("path");

console.log(" \x1b[34m▲ MergeTranslations\x1b[0m\n");
const startTime = Date.now();

const translationsDir = path.join(__dirname, "../_translations");
const outputDir = path.join(__dirname, "../.translations");

if (!fs.existsSync(translationsDir)) {
    console.error(" \x1b[31m✗\x1b[0m Error: Translations directory not found!");
    process.exit(1);
}

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log(" \x1b[32m✓\x1b[0m Starting merge process...");

let languages;
try {
    languages = fs.readdirSync(translationsDir).filter(lang => 
        fs.statSync(path.join(translationsDir, lang)).isDirectory()
    );
} catch (error) {
    console.error(" \x1b[31m✗\x1b[0m Error: Unable to read translations directory.", error);
    process.exit(1);
}

if (languages.length === 0) {
    console.warn(" \x1b[33m⚠\x1b[0m Warning: No language directories found.");
    process.exit(0);
}

languages.forEach(lang => {
    console.log(` \x1b[32m✓\x1b[0m Processing language: ${lang}...`);
    const langDir = path.join(translationsDir, lang);
    
    let jsonFiles;
    try {
        jsonFiles = fs.readdirSync(langDir).filter(file => file.endsWith(".json"));
    } catch (error) {
        console.error(` \x1b[31m✗\x1b[0m Error: Unable to read language directory: ${langDir}`, error);
        return;
    }
    
    if (jsonFiles.length === 0) {
        console.warn(` \x1b[33m⚠\x1b[0m Warning: No JSON files found in ${langDir}`);
        return;
    }

    let mergedTranslations = {};

    jsonFiles.forEach(file => {
        console.log(`   - Merging file: ${file}`);
        const filePath = path.join(langDir, file);
        try {
            const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
            Object.keys(content).forEach(key => {
                const keyParts = key.split(".");
                let current = mergedTranslations;
                for (let i = 0; i < keyParts.length; i++) {
                    if (!current[keyParts[i]]) {
                        current[keyParts[i]] = {};
                    }
                    if (i === keyParts.length - 1) {
                        current[keyParts[i]] = content[key];
                    } else {
                        current = current[keyParts[i]];
                    }
                }
            });
        } catch (error) {
            console.error(` \x1b[31m✗\x1b[0m Error parsing JSON file: ${filePath}`, error);
        }
    });

    const outputFilePath = path.join(outputDir, `${lang}.json`);
    try {
        fs.writeFileSync(outputFilePath, JSON.stringify(mergedTranslations, null, 2), "utf8");
        console.log(` \x1b[32m✓\x1b[0m Created merged translation file: ${outputFilePath}`);
    } catch (error) {
        console.error(` \x1b[31m✗\x1b[0m Error writing merged file: ${outputFilePath}`, error);
    }
});

const endTime = Date.now();
console.log(` \x1b[32m✓\x1b[0m Merge process completed in ${(endTime - startTime) / 1000}s\n`);