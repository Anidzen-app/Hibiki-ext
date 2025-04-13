import fs from "fs-extra";
import { resolve, join } from "path";

const UI_PRO_DIR = resolve("node_modules", "@nuxt", "ui-pro");

const INDEX_SOURCE_PATH = resolve(
  "ui-pro-plugin",
  "pro",
  "shared",
	"v.3.0.2",
  "ui-pro.BZAmqo9Y.cjs",
);

const INDEX_DEST_PATH = join(
  UI_PRO_DIR,
  "dist",
  "shared",
  "ui-pro.BZAmqo9Y.cjs",
);

const LICENSE_SOURCE_PATH = resolve(
  "ui-pro-plugin",
  "pro",
  "shared",
	"v.3.0.2",
  "ui-pro.DXGwPxta.mjs",
);

const LICENSE_DEST_PATH = join(
  UI_PRO_DIR,
  "dist",
  "shared",
  "ui-pro.DXGwPxta.mjs",
);

async function rewriteLicenseFile() {
  try {
    if (!(await fs.pathExists(UI_PRO_DIR))) {
      console.log(`ui-pro не найден в node_modules: ${UI_PRO_DIR}`);
      return;
    }

    console.log(`Найден ui-pro. Перезаписываю файлы...`);

    const indexContent = await fs.readFile(INDEX_SOURCE_PATH, "utf-8");
    await fs.outputFile(INDEX_DEST_PATH, indexContent);

    const licenseContent = await fs.readFile(LICENSE_SOURCE_PATH, "utf-8");
    await fs.outputFile(LICENSE_DEST_PATH, licenseContent);

    console.log("✅ Файлы лицензии успешно перезаписаны!");
  } catch (error) {
    console.error("❌ Ошибка при перезаписи файлов:", error);
  }
}

rewriteLicenseFile().then((r) => {});
