const firebase = require('firebase');
const database = require('../../../db.js');

const db = database.db;
//const admin = database.admin;

module.exports = {

  // LOGIN
  login: async function (req, res) {
    return firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
      .then((response) => {
        res.json(response);
        return response;
      }).catch(err => {
        res.json(err);
        return err;
      });
  },

  /* REGISTER */
  register: async function (req, res) {

    // note : this is over-engineering
    var count = 0;
    await db.collection('users').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.data().pseudo === req.body.pseudo || req.body.pseudo === '') { count++; }
        });
      });
    if (count !== 0) {
      const output = { status: 'ERROR', data: 'Pseudo already exist' };
      res.status(400).json(output);
      return output;
    }

    return firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
      .then((responseDB) => {
        return db.collection('users').doc(responseDB.user.uid).set({
          mail: req.body.email,
          pseudo: req.body.pseudo,
        })
          .then(() => {
            res.json(responseDB);
            return responseDB;
          })
          .catch(err => {
            res.json(err);
            return err;
          });
      })
      .catch(err => {
        res.json(err);
        return err;
      });
  },

  // LOGOUT
  logout: function (req, res) {
    return firebase.auth().signOut()
      .then(() => {
        const out = { status: 'SUCCES', data: 'User Logout' };
        res.status(200).json(out);
        return out;
      }).catch(err => {
        res.json(err);
        return err;
      });
  },

  // ERASE USER
  /*erase: function (req, res) {
    firebase.auth().signInWithEmailAndPassword(req.query.email, req.query.password)
    .then((responseDB) => {
      admin.auth().deleteUser(responseDB.user.uid)
      .then(out => {
        res.json(out);
      }).catch(err => {
        console.log(err);
        res.json(err);
      });
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
  },*/

}; // end of module.export
