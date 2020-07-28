const UserController = require('../../api/controllers/Account/UserController');
const expect = require('chai').expect;
const admin = require('firebase-admin');

function randomStringGenerator(length) {
  var result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) { result += characters.charAt(Math.floor(Math.random() * charactersLength)); }
  return result;
}

var tmp = { json: () => { return tmp; }, status: () => { return tmp; } };

describe('UserController: Register', () => {

  // todo :
  // add test where fields are missing
  // add test if pseudo already exist

  it('Should register a new user successfully', async () => {

    const randPseudo = 'remove_me_' + randomStringGenerator(5);
    let uid = '';

    return UserController.register({
      body: {
        pseudo: randPseudo,
        email: randPseudo + '@gmail.com',
        password: 'securedpassword'
      }
    }, tmp)
      .then(data => {
        expect(data.user.email).to.equal(randPseudo + '@gmail.com');
        uid = data.user.uid;
        db = admin.firestore();
        db.collection('users').doc(uid).delete().then( () => {
          console.log('Users ' + uid + ' delete');
        }).catch(err => {
          console.log(err);
        });
      });

  });

  it('Should fail to register: reason invalid email', () => {

    return UserController.register({
      body: {
        pseudo: 'validPseudo',
        email: 'invalidEmail',
        password: 'validPassword'
      }
    }, tmp)
      .then(data => {
        expect(data.code).to.equal('auth/invalid-email');
      });

  });

  it('Should fail to register: reason invalid password', () => {

    return UserController.register({
      body: {
        pseudo: 'validPseudo',
        email: 'validEmail@gmail.com',
        password: '_'
      }
    }, tmp)
      .then(data => {
        expect(data.code).to.equal('auth/weak-password');
      });

  });

  it('Should fail to register: reason email already exist', () => {

    return UserController.register({
      body: {
        pseudo: 'TEMPLATE_CPY',
        email: 'template@template.com',
        password: 'foobar'
      }
    }, tmp)
      .then(data => {
        expect(data.code).to.equal('auth/email-already-in-use');
      });

  });

});

describe('UserController: Login', () => {

  it('Should login successfully', () => {

    return UserController.login({
      body: {
        email: 'template@template.com',
        password: 'template'
      }
    }, tmp)
      .then(data => {
        expect(data.user.email).to.equal('template@template.com');
      });

  });

  it('Should fail to login: reason invalid password', () => {

    return UserController.login({
      body: {
        email: 'template@template.com',
        password: 'foobar'
      }
    }, tmp)
      .then(data => {
        expect(data.code).to.equal('auth/wrong-password');
      });

  });

});

// WTF
describe('UserController: Logout', () => {

  it('Should logout successfully', () => {

    return UserController.logout({ }, tmp)
      .then(data => {
        console.log(data);
      });

  });

});
