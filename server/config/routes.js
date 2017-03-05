import users from './controller/users';

const routes = (router) => {
  router.post('/users/create', users.create);
  router.get('/users', users.findAll);
};

export default routes;
