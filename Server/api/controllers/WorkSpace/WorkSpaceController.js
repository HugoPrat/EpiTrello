const database = require('../../../db.js');

const db = database.db;
const admin = database.admin;

module.exports = {

  /* ADD BOARD FOR USER */
  createBoard: async function (req, res) {
    var allBoard = db.collection('boards');
    var uidUser = req.body.uidUser;
    var boardName = req.body.boardName;
    var isBoardNameExist = false;

    // Check if the name of the board that we create is correct
    if (boardName === '') { return res.status(400).json( {status: 'ERROR', data: 'Invalid board name' } ); }

    // Check if the user is owner of a board with the same name
    await allBoard.get().then( alldocument => { alldocument.forEach (doc => {
      if (doc.data().boardName === boardName && doc.data().usersList[0] === uidUser) {
        isBoardNameExist = true;
      }
    });});
    if (isBoardNameExist === true) { return res.status(400).json( {status: 'ERROR', data: 'Name already taken' } ); }

    // Add a new board
    await allBoard.add({
      usersList: [uidUser],
      boardName: boardName
    }).catch(err => {
      console.error(err);
      return res.status(400).json( {status: 'ERROR', data: err } );
    });

    return res.status(200).json( { status: 'SUCCES', data: 'Create new board', boardUID: res.id} );
  },


  /* DELETE BOARD */
  deleteBoard: async function (req, res) {
    var allBoard = db.collection('boards');
    var uidUser = req.body.uidUser;
    var uidBoard = req.body.uidBoard;
    var isBoardExist = false;

    // Check if the board exist
    await allBoard.doc(uidBoard).get().then(doc => {
      if (!doc.exists) { isBoardExist = false; } else { isBoardExist = true; }
    });
    if (isBoardExist === false) { return res.status(400).json( { status: 'ERROR', data: 'Board does not exist' } );}

    // Check if the user is the owner of the board
    await allBoard.doc(uidBoard).get().then(doc => {
      if (doc.data().usersList[0] === uidUser) {
        allBoard.doc(uidBoard).delete().catch(err => { return res.status(400).json( {status: 'ERROR', data: err } );});
        return res.status(200).json( {status: 'SUCCES', data: 'Delete document:' + uidBoard } );
      }
      else if (doc.data().usersList.find(element => element === uidUser)) {
        allBoard.doc(uidBoard).update({
          usersList: admin.firestore.FieldValue.arrayRemove(uidUser)
        }).catch(err => { return res.status(400).json( {status: 'ERROR', data: err } );});
        return res.status(200).json( {status: 'SUCCES', data: 'Delete uid:' + uidUser + 'from board: '+ uidBoard } );
      }
      return res.status(400).json( {stats: 'ERROR', data: 'User does not exist in the Board'} );
    });
  },

  /* EDIT BOARD NAME */
  editBoardName: async function(req, res) {
    var oldName = req.body.oldName;
    var newName = req.body.newName;
    var allBoard = db.collection('boards');
    var uidUser = req.body.uidUser;
    var uidBoard = req.body.uidBoard;
    var isNameTaken = false;
    var isBoardExist = false;

    // Check if field are correctly fill
    if (oldName === '' || newName === '') { return res.status(400).json( { status: 'ERROR', data: 'Insert a valid name'} );}

    // Check if the board exist
    await allBoard.doc(uidBoard).get().then(doc => {
      if (!doc.exists) {
        isBoardExist = true;
      }
    });
    if (isBoardExist === true) { return res.status(400).json( { status: 'ERROR', data: 'Board does not exist' } ); }

    // Check if the user is the owner AND check if the oldName board exist
    await allBoard.doc(uidBoard).get().then(doc => {
      if (doc.data().usersList[0] !== uidUser) {
        return res.status(400).json( { status: 'ERROR', data: 'You are not the owner of the board' } );
      }
    }).catch(err => {
      console.error(err);
      res.json(err);
    });

    // Check if the newName isEqual to another boardName where the user is the owner
    await allBoard.get().then(snapshot => {snapshot.forEach(doc => {
      if (doc.data().boardName === newName && doc.data().usersList.indexOf(uidUser) === 0) { isNameTaken = true; }
    });});
    if (isNameTaken === true) { return res.status(400).json( {status: 'ERROR', data: 'Name already taken'} );}

    // Update the name of the board
    await allBoard.doc(uidBoard).update({
      boardName: newName,
    }).catch( err => { console.error(err); res.json(err); });

    return res.status(200).json( {status: 'SUCCES', data: 'Change ' + oldName + ' board to ' + newName} );
  },


  /* GET BOARDS FOR USER */
  getBoards: async function (req, res) {
    var boards = {data: []};
    var allBoard = db.collection('boards');
    var allUser = db.collection('users');
    var count = 0;

    await allUser.get().then(snapshot => {snapshot.forEach(doc => {
      if (doc.id === req.query.uidUser) { count++; }
    });});
    if (count === 0) { return res.status(400).json( {status: 'ERROR', data: 'Incorrect UID' } );}
    await allBoard.get().then(snapshot => { snapshot.forEach(doc => {
      if (doc.data().usersList.indexOf(req.query.uidUser) >= 0) {
        boards.data.push({
          'boardName': doc.data().boardName,
          'boardID': doc.id
        });
      }
    });});
    return res.status(200).json( {status: 'SUCCES', boards} );
  },

};
