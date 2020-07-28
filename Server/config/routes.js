/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //  '/': { view: 'pages/homepage' },

  /* ACCOUNT */
  'POST /account/login':    { controller: 'Account/UserController', action: 'login'},
  'POST /account/register': { controller: 'Account/UserController', action: 'register'},
  'GET  /account/logout':   { controller: 'Account/UserController', action: 'logout'},

  /* WORKSPACE */
  'POST /workspace/createBoard':   {controller: 'WorkSpace/WorkSpaceController', action: 'createBoard'},
  'POST /workspace/editBoardName': {controller: 'WorkSpace/WorkSpaceController', action: 'editBoardName'},
  'POST /workspace/deleteBoard':   {controller: 'WorkSpace/WorkSpaceController', action: 'deleteBoard'},
  'GET  /workspace/getBoards':     {controller: 'WorkSpace/WorkSpaceController', action: 'getBoards'},

  /* BOARD */
  //  'GET /workspace/boardSelected': {conteoller: 'board/BoardController', action: 'selectedBoard'}

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
