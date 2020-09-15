import * as firebase from 'firebase';

const init = ref => {
  const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    ref, {
      size: 'invisible',
      callback: function(response) {},
      'expired-callback': function() {},
    }
  );

  return recaptchaVerifier;
};

export default () => {
  return {
    init,
  };
};
