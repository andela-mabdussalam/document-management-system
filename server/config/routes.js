import users from './controller/users';
import roles from './controller/roles';
import document from './controller/documents';

const routes = (router, authenticate) => {
  // Routes to create user and retrieve all users
  router.post('/users/signup', users.create);

  router.post('/users/login', users.logIn);

  // Route to logout user
  router.post('/users/logout', users.logOut);
  router.get('/users/:identifier', users.identifier);

  // Route to get all users
  router.get('/users', authenticate.verifyToken, authenticate.isAdmin, users.findAll);

  // Route to get, edit or delete a single user
  router.route('/users/:id')
    .get(authenticate.verifyToken, users.getUser)
    .put(authenticate.verifyToken, users.updateUser)
    .delete(authenticate.verifyToken, authenticate.isAdmin, users.removeUser);

  // Route to create a role
  router.route('/roles')
    .post(roles.create)
    .get(authenticate.verifyToken, authenticate.isAdmin, roles.getAllRoles);

  router.route('/roles/:id')
    .get(authenticate.verifyToken, authenticate.isAdmin, roles.getRole)
    .put(authenticate.verifyToken, authenticate.isAdmin, roles.updateRole)
    .delete(authenticate.verifyToken, authenticate.isAdmin, roles.deleteRole);

  router.route('/documents')
    .post(authenticate.verifyToken, document.create)
    .get(authenticate.verifyToken, document.getAll);

  router.route('/documents/:id')
    .get(authenticate.verifyToken, document.getOne)
    .put(authenticate.verifyToken, document.update)
    .delete(authenticate.verifyToken, authenticate.isAdmin, document.remove);

  router.route('/documents/search')
     .post(authenticate.verifyToken, document.search);

  router.route('/user/:id/document')
        .get(document.getDocsForUser);
};


export default routes;
