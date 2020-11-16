import v1 from './v1';
import pages from './pages';

export default app => {
  app.use('/api/v1', v1);
  app.use('/', pages);
};
