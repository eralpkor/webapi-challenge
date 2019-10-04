const Action = require('../data/helpers/actionModel.js');

function validateId(req, res, next) {
  const { id } = req.params;
  Action.get(id)
    .then(actions => {
      if (actions) {
        req.actions = actions;
        next();
      } else {
        res.status(404).json({ error: `actions with ID ${id} does not exist`})
      }
    })
}

module.exports = {
  validateId
}