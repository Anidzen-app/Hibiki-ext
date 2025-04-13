import fs from "fs-extra";
import { resolve, join } from "path";

const UI_PRO_DIR = resolve("node_modules", "@nuxt", "ui-pro");

const INDEX_SOURCE_PATH = resolve(
    "ui-pro-plugin",
    "pro",
    "shared",
    "v.3.0.2",
    "ui-pro.BIDAE6aJ.cjs",
);

const INDEX_DEST_PATH = join(
    UI_PRO_DIR,
    "dist",
    "shared",
    "ui-pro.BIDAE6aJ.cjs",
);

const LICENSE_SOURCE_PATH = resolve(
    "ui-pro-plugin",
    "pro",
    "shared",
    "v.3.0.2",
    "ui-pro.qTd-WLcu.mjs",
);

const LICENSE_DEST_PATH = join(
    UI_PRO_DIR,
    "dist",
    "shared",
    "ui-pro.qTd-WLcu.mjs",
);

async function rewriteLicenseFile() {
  try {
    if (!(await fs.pathExists(UI_PRO_DIR))) {
      console.log(`The target directory is not found: ${UI_PRO_DIR}`);
      return;
    }

    console.log(`Target directory found. Overwriting files...`);

    const indexContent = await fs.readFile(INDEX_SOURCE_PATH, "utf-8");
    await fs.outputFile(INDEX_DEST_PATH, indexContent);

    const licenseContent = await fs.readFile(LICENSE_SOURCE_PATH, "utf-8");
    await fs.outputFile(LICENSE_DEST_PATH, licenseContent);

    console.log("✅ Files successfully updated!");
  } catch (error) {
    console.error("❌ Error while updating the files:", error);
  }
}

rewriteLicenseFile().then(() => {});
