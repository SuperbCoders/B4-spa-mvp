import * as firebase from 'firebase';
import config from 'config';

firebase.initializeApp(config.firebase);

let auth = firebase.auth();

const recheck = () => {
  auth = firebase.auth();
};

export default () => {
  const currentUser = auth.currentUser;
  const isLoggedIn = !!currentUser;

  return {
    auth: (() => firebase.auth())(),

    isLoggedIn,
    currentUser: isLoggedIn ? currentUser : null,

    recheck,
  };
};
