const router = require('express').Router();
const middleware = require('../middleware/middleware.js');
const Projects = require('../data/helpers/projectModel.js');
const Actions = require('../data/helpers/actionModel.js');
const chalk = require('chalk')

// GET all projects from /api/projects
router.get('/', (req, res) => {
  Projects.get()
    .then(projects => res.status(200).json(projects))
    .catch(err => {
      console.log(chalk.red(err));
      res.status(500).json({error: "Error retrieving the projects..."});
    });
});

// POST /api/projects to create new project
router.post('/', middleware.validatePost, (req, res) => {

  Projects.insert(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => {
      console.log(chalk.red(err));
      res.status(500).json({error: "Error adding the project..."})
    });
});

// PUT /api/projects Update a project...
router.put('/:id', middleware.validateId, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  Projects.update(id, {name})
    .then(project => {
      if (project) {
        Projects.get(id)
          .then(pro => res.status(200).json(pro))
          .catch(err => {
            console.log(chalk.red(err));
            res.status(500).json({error: `Error getting project`})
          })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: `Error updating...`});
    })
});

// DELETE /api/projects/:id delete a project
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Projects.remove(id)
    .then(deletedProject => {
      if (deletedProject) {
        res.status(204).end();
      } else {
        res.status(404).json({message: "This project doesn't exist in the database."})
      }
    })
    .catch(err => {
      console.log(chalk.red(err));
      res.status(500).json({ error: `Error deleting project...`})
    })
});

// GET /api/projects/:id/actions endpoint to Retrieve actions by project
router.get('/:id/actions', (req, res) => {
  const id = req.params.id;

  Projects.getProjectActions(id)
  .then( actions => {
      if(actions[0]){
          res.status(200).json(actions)
      } else {
          res.status(404).json({ message: "project not found." })
      }
  })
  .catch(err => {
      console.log(chalk.red(err))
      res.status(500).json({ error: "There was an error trying to retrieve the projects from the database." })
  });
});

// POST /api/projects/:id/actions Create new action
router.post('/:id/actions', middleware.validateAction, (req, res) => {
  const actionInfo = { ...req.body, project_id: req.params.id };

  Projects.getProjectActions(req.params.id)
    .then(actions => {
      if (actions[0]) {
        Actions.insert(actionInfo)
          .then(action => {
            if (action) {
              res.status(210).json(action)
            } else {
              res.status(404).json({message: 'The project could not be found' });
            }
          })
          .catch(err => {
            console.log(chalk.red(err));
            res.status(500).json({message: 'Error adding the action for the project' })
          })
      } else {
        res.status(404).json({ message: 'The project could not be found' });
      }
    })
    .catch(err => {
      console.log(chalk.red(err));
      res.status(500).json({ message: 'Error getting the actions for the project' });
    });
});

module.exports = router;