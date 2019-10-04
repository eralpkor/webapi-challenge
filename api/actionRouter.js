const router = require('express').Router();
const middleware = require('../middleware/middleware.js');
const Actions = require('../data/helpers/actionModel.js');

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

router.get('/:id', middleware.validateId, (req, res) => {
  // const { id } = req.params;

  // Actions.get(id)
  //   .then(actions => {
  //     if (id) {
        res.status(200).json(req.actions);
//       } else {
//         res.status(404).json({ message: `Action with ID ${id} not found...`})
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({error: "Cannot perform actions, server error..."})
//     })
})

module.exports = router;