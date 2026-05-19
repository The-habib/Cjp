import app from "./server.js";

export default function(request, response) {
  // Try calling Web fetch, wait Vercel Nodejs functions natively support Web Request signature 
  // via export default function(req) { return Response }
  return app.fetch(request, process?.env || {}, {});
}