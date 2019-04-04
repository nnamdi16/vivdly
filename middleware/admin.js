module.exports = (req,res,next) => {
  if(!req.user.isAdmin) return res.status(403).send('Access Denied');

  next();
}
// 401 - Unauthorized: Used when a user tries to access a protected resource but they don't supply a valid json web token, they are given a chance to retry and resend a valid json web token.If they send a valid json web token and  they sre still not allowed to access the target resource, than we use a 403
//403 - Forbidden