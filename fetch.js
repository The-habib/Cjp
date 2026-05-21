const fs = require("fs");
const prerender = require("./dist/sitemap.xml", "utf8");
// Oh wait, I can just fetch it again
fetch("https://cockroachjantaparty.bond/sitemap.xml")
  .then((r) => r.text())
  .then((xml) => {
    const { XMLParser, XMLValidator } = require("fast-xml-parser");
    const result = XMLValidator.validate(xml);
    console.log(result);
  });
