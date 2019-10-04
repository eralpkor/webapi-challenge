const router = require('express').Router();
const middleware = require('../middleware/middleware.js');
const Actions = require('../data/helpers/actionModel.js');

// GET /api/actions to retrieve actions
router.get('/', (req, res) => {
  Actions.get()
    .then(actions => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: "Action not found..."});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: "Cannot retrieve actions..."});
    });
});

// GET by id /api/actions
router.get('/:id', middleware.validateId, (req, res) => {
  res.status(200).json(req.actions);
});

router.put('/:id', middleware.validateAction, (req, res) => {
  const { id } = req.params;
  
  Actions.update(id, req.body)
    .then(updateAction => {
      if (updateAction) {
          res.status(200).json(updateAction)
      } else {
        res.status(400).json({error: `Error getting action ID ${id}`})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: `Error getting action ID ${id}`});
    });
});

router.delete('/id', middleware.validateId, (req, res) => {
  const { id } = req.params;

  Actions.remove(id)
    .then(() => res.status(204).end())
    .catch(err => {
      console.log(err);
      res.status(500).json({error: `Error deleting action with ${id}`})
    })
});

module.exports = router;