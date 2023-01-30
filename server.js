const app = require('./app');
const mainRouter = require('./routers/router');

app.use(mainRouter);

app.listen(3000);
