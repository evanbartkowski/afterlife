// Afterlight Auth - Firebase Authentication module
// Clean separation for future Firestore/cloud saves upgrade.

(function() {
  // === FIREBASE CONFIGURATION ===
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDsIm18incEpuBJ7rqTcqwBAUC1GdEJr9w",
    authDomain: "afterlife-989b5.firebaseapp.com",
    projectId: "afterlife-989b5",
    storageBucket: "afterlife-989b5.firebasestorage.app",
    messagingSenderId: "118699875357",
    appId: "1:118699875357:web:b7ffeaff62414d6bdffaf4",
    measurementId: "G-WVSSD8JS5Y"
  };

  // Initialize Firebase (compat build for simple vanilla JS include)
  if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);

    // Optional: Initialize Analytics (if the analytics-compat script is included)
    if (typeof firebase.analytics === 'function') {
      try {
        firebase.analytics();
      } catch (e) {
        // Analytics is optional
      }
    }
  }

  const auth = (typeof firebase !== 'undefined') ? firebase.auth() : null;

  if (auth) {
    // Persist sessions across refreshes (LOCAL = survives browser close)
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(() => {});
  }

  let currentUser = null; // Firebase User or null

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
    if (email.includes('@')) {
      return email.split('@')[0];
    }
    return email || currentUser.uid.substring(0, 8);
  }

  // Public API (global for vanilla script access)
  window.AfterlightAuth = {
    getCurrentPlayerId,
    isGuest: isGuestUser,
    getUserDisplay: getUserDisplayName,

    async createAccount(email, password) {
      if (!auth) throw new Error('Firebase not loaded');
      const cred = await auth.createUserWithEmailAndPassword(email, password);
      currentUser = cred.user;
      return cred.user;
    },

    async login(email, password) {
      if (!auth) throw new Error('Firebase not loaded');
      const cred = await auth.signInWithEmailAndPassword(email, password);
      currentUser = cred.user;
      return cred.user;
    },

    async loginGuest() {
      if (!auth) throw new Error('Firebase not loaded');
      const cred = await auth.signInAnonymously();
      currentUser = cred.user;
      return cred.user;
    },

    async logout() {
      if (!auth) return;
      await auth.signOut();
      currentUser = null;
    },

    // Subscribe to auth changes. Callback receives Firebase user or null.
    onAuthStateChanged(callback) {
      if (!auth) {
        // fallback
        setTimeout(() => callback(null), 0);
        return () => {};
      }
      return auth.onAuthStateChanged((user) => {
        currentUser = user;
        callback(user);
      });
    },

    getAuth: () => auth
  };

  // For internal use in this file if needed
  console.log('[AfterlightAuth] Firebase initialized with project:', firebaseConfig.projectId);
})();
