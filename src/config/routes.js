const path = require('path');
const fs = require('fs');

const registerRoute = (app) => {
  const isDev = process.env.NODE_ENV === 'development';
  const registered = [];

  // Health route
  const healthRoute = require('../system/health');
  app.use('/v1', healthRoute);
  registered.push('GET      /v1/health');

  // Route subfolders inside routes/
  const subFolders = ['admin', 'auth', 'user'];

  subFolders.forEach((folder) => {
    const folderPath = path.join(__dirname, '..', 'routes', folder);
subFolders.forEach((folder) => {
    const folderPath = path.join(__dirname, '..', 'routes', folder);

    if (fs.existsSync(folderPath)) {
      fs.readdirSync(folderPath).forEach((file) => {
        if (file.endsWith('.js')) {
          const route = require(path.join(folderPath, file));
          app.use(`/v1/${folder}`, route); // ✅ /v1/auth, /v1/user, /v1/admin

          route.stack.forEach((layer) => {
            if (layer.route) {
              const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
              registered.push(`${methods.padEnd(8)} /v1/${folder}${layer.route.path}`);
            }
          });
        }
      });
    }
  });
});


  // ✅ print all at the end
  console.log('\n📋 Registered Routes:');
  console.log('─'.repeat(40));
  registered.forEach((r) => console.log(r));
  console.log('─'.repeat(40) + '\n');
};

module.exports = registerRoute;