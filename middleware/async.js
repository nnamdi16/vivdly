//It solves the problem of repetitive try catch blocks
module.exports = (handler) => {
  return async(req,res,next) => {
    try {
      await  handler(req,res);
     } catch (ex) {
       next(ex);
     }
  };
};
