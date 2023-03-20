const app = require('./app');
const envConfig = require('./utilities/env.config');

app.listen(envConfig.PORT || 3000);
