
const handleReq = fun => async function (req, res, next) {
    try {
      res.send(200, await fun(req));
      next && next();
    } catch (err) {
      console.log('err ---------------------- ');
      // console.error(err.stack, err.blocksStack);
      console.error(err);
      res.status(500).send(err)
    }
  };
  module.exports = {
    handleReq
  }