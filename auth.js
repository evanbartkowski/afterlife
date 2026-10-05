// Afterlight Auth - Firebase Authentication module
// Clean separation for future Firestore/cloud saves upgrade.

(function() {
  const firebaseConfig = {
    apiKey: "AIzaSyDsIm18incEpuBJ7rqTcqwBAUC1GdEJr9w",
    authDomain: "afterlife-989b5.firebaseapp.com",
    projectId: "afterlife-989b5",
    storageBucket: "afterlife-989b5.firebasestorage.app",
    messagingSenderId: "118699875357",
    appId: "1:118699875357:web:b7ffeaff62414d6bdffaf4",
    measurementId: "G-WVSSD8JS5Y"
  };

  let auth = null;
  let ready = Promise.resolve();
  let currentUser = null;
  let lastError = null;

  if (typeof firebase === 'undefined') {
    lastError = new Error('Firebase not loaded');
  } else {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    // Persistence must finish before any sign-in. Calling them together
    // cancels guest/email sign-in and drops the restored session on refresh.
    ready = auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch((err) => {
      lastError = err;
    });
  }

  function getCurrentPlayerId() {
    return currentUser ? currentUser.uid : null;
  }

  function isGuestUser() {
    return !!(currentUser && currentUser.isAnonymous);
  }

  function getUserDisplayName() {
    if (!currentUser) return 'GUEST';
    if (currentUser.isAnonymous) return 'GUEST';
    const email = currentUser.email || '';
    const name = email.includes('@') ? email.split('@')[0] : email;
    return name || currentUser.uid.substring(0, 8);
  }

  async function run(action) {
    await ready;
    if (!auth) {
      const err = lastError || new Error('Firebase not loaded');
      err.code = err.code || 'auth/network-request-failed';
      throw err;
    }
    return action();
  }

  window.AfterlightAuth = {
    getCurrentPlayerId,
    isGuest: isGuestUser,
    getUserDisplay: getUserDisplayName,
    ready: () => ready,
    getLastError: () => lastError,

    createAccount(email, password) {
      return run(async () => {
        const cred = await auth.createUserWithEmailAndPassword(email, password);
        currentUser = cred.user;
        return cred.user;
      });
    },

    login(email, password) {
      return run(async () => {
        const cred = await auth.signInWithEmailAndPassword(email, password);
        currentUser = cred.user;
        return cred.user;
      });
    },

    loginGuest() {
      return run(async () => {
        const cred = await auth.signInAnonymously();
        currentUser = cred.user;
        return cred.user;
      });
    },

    logout() {
      return run(async () => {
        await auth.signOut();
        currentUser = null;
      });
    },

    onAuthStateChanged(callback) {
      if (!auth) {
        const err = lastError;
        setTimeout(() => callback(null, err), 0);
        return () => {};
      }
      return auth.onAuthStateChanged((user) => {
        currentUser = user;
        callback(user, null);
      }, (err) => {
        lastError = err;
        currentUser = null;
        callback(null, err);
      });
    },

    getAuth: () => auth
  };
})();
