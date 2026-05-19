import fs from 'fs';
import path from 'path';

function buildVercel() {
  const vercelDir = path.join(process.cwd(), '.vercel', 'output');
  if (fs.existsSync(vercelDir)) {
    fs.rmSync(vercelDir, { recursive: true });
  }
  fs.mkdirSync(vercelDir, { recursive: true });

  // Create config.json
  fs.writeFileSync(path.join(vercelDir, 'config.json'), JSON.stringify({
    version: 3,
    routes: [
      { handle: "filesystem" },
      { src: "/(.*)", dest: "/" }
    ]
  }, null, 2));

  // Copy static files
  const staticDir = path.join(vercelDir, 'static');
  fs.mkdirSync(staticDir);
  fs.cpSync(path.join(process.cwd(), 'dist', 'client'), staticDir, { recursive: true });

  // Create function
  const funcDir = path.join(vercelDir, 'functions', 'index.func');
  fs.mkdirSync(funcDir, { recursive: true });

  // Copy the entire server output into the function directory
  fs.cpSync(path.join(process.cwd(), 'dist', 'server'), funcDir, { recursive: true });

  // Create the entrypoint
  fs.writeFileSync(path.join(funcDir, 'index.js'), `import app from "./server.js";

export default function(request, response) {
  // Try calling Web fetch, wait Vercel Nodejs functions natively support Web Request signature 
  // via export default function(req) { return Response }
  return app.fetch(request, process?.env || {}, {});
}`);

  // Create .vc-config.json for Nodejs
  fs.writeFileSync(path.join(funcDir, '.vc-config.json'), JSON.stringify({
    runtime: "nodejs20.x",
    handler: "index.js",
    launcherType: "Nodejs"
  }, null, 2));

  console.log('✅ Generated .vercel/output APIv3 structure using Node.js');
}

buildVercel();
