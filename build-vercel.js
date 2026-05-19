import fs from "fs";
import path from "path";

function buildVercel() {
  const vercelDir = path.join(process.cwd(), ".vercel", "output");
  if (fs.existsSync(vercelDir)) {
    fs.rmSync(vercelDir, { recursive: true });
  }
  fs.mkdirSync(vercelDir, { recursive: true });

  fs.writeFileSync(
    path.join(vercelDir, "config.json"),
    JSON.stringify(
      {
        version: 3,
        routes: [{ handle: "filesystem" }, { src: "/(.*)", dest: "/" }],
      },
      null,
      2,
    ),
  );

  const staticDir = path.join(vercelDir, "static");
  fs.mkdirSync(staticDir, { recursive: true });
  fs.cpSync(path.join(process.cwd(), "dist", "client"), staticDir, { recursive: true });

  const funcDir = path.join(vercelDir, "functions", "index.func");
  fs.mkdirSync(funcDir, { recursive: true });

  fs.cpSync(path.join(process.cwd(), "dist", "server"), funcDir, { recursive: true });

  // Wrap the 'fetch' exported from server.js with a Node http req/res adapter
  fs.writeFileSync(
    path.join(funcDir, "index.js"),
    `
import app from "./server.js";
import { Readable } from 'stream';

export default async function(req, res) {
  // Convert Node.js req to Web Request
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const url = new URL(req.url, \`\${protocol}://\${req.headers.host}\`);
  
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      value.forEach(v => headers.append(key, v));
    } else if (value) {
      headers.set(key, value);
    }
  }

  const init = {
    method: req.method,
    headers
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = new ReadableStream({
      start(controller) {
        req.on('data', chunk => controller.enqueue(chunk));
        req.on('end', () => controller.close());
        req.on('error', err => controller.error(err));
      }
    });
    // Required in Node < 21 for readable stream body
    init.duplex = 'half'; 
  }

  const webRequest = new Request(url.href, init);
  
  try {
    const webResponse = await app.fetch(webRequest, process.env || {}, {});
    
    // Convert Web Response back to Node res
    res.statusCode = webResponse.status;
    res.statusMessage = webResponse.statusText;
    
    webResponse.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (webResponse.body) {
      const reader = webResponse.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
`,
  );

  fs.writeFileSync(
    path.join(funcDir, ".vc-config.json"),
    JSON.stringify(
      {
        runtime: "nodejs20.x",
        handler: "index.js",
        launcherType: "Nodejs",
      },
      null,
      2,
    ),
  );

  console.log("✅ Generated .vercel/output APIv3 structure using Node.js wrapper");
}

buildVercel();
