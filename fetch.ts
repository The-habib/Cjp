import { fileURLToPath } from "url";
import { XMLValidator } from "fast-xml-parser";
import fs from "fs";

try {
  const xml = fs.readFileSync("dist/sitemap.xml", "utf8");
  const result = XMLValidator.validate(xml);
  console.log("Validation result:", result);
} catch (e) {
  console.error("Error reading sitemap:", e);
}
