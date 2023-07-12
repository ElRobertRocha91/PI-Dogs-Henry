const { Router } = require('express');

const {getDogsHandler, getDogByIdHandler, createDogHandler } = require('../handlers/dogsHandlers');

const dogsRouter = Router();

dogsRouter.get('/', getDogsHandler);

dogsRouter.get('/:id', getDogByIdHandler);

dogsRouter.post('/', createDogHandler);

module.exports = dogsRouter;
