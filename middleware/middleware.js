const Action = require('../data/helpers/actionModel.js');


function logger(req, res, next){
  const now = new Date().toISOString();
  console.log(`\nMethod: ${req.method}, \nURL: ${req.url}, \n Time: ${now}`);
  next();
}

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

function validateAction(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: 'Missing action data!' });
  } else if (!req.body.description) {
    res.status(400).json({ message: 'Missing required "description" field!' });
  } else if (!req.body.notes) {
    res.status(400).json({ message: 'Missing required "notes" field!' });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const { description, name } = req.body;

  if (!req.body) {
    return res.status(400).json({ error: "Please enter something..."});
  }
  if (!description || !name) {
    return res.status(400).json({ error: "Please enter something..."});    
  }
  req.body = {description,  name };
  next();
}

module.exports = {
  validateId,
  logger,
  validateAction,
  validatePost
}
