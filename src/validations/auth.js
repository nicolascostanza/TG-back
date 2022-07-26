import firebase from '../helper/firebase';

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;
  if (req.path === '/register') {
    next();
  }
  if (!token) {
    return res.status(400).json({ message: 'Authentication failed' });
  }
  return firebase
    .auth()
    .verifyIdToken(token)
    .then((response) => {
      req.firebaseUid = response.uid;
      next();
    })
    .catch((error) => {
      res.status(401).json({ message: error.toString() });
    });
};

export default authMiddleware;
