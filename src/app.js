const express = require("express");
const cors = require("cors");
const {uuid} = require('uuidv4')

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body
  const repository = {id:uuid(),title,url,techs,likes:0}
  repositories.push(repository)
  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params
  const {title, url, techs} =request.body
  const Indexrepository = repositories.findIndex(repository=> repository.id ===id)
  if(Indexrepository<0){
    return response.status(400).json()
  }
  const repository = repositories[Indexrepository]
  repositories[Indexrepository] = {id:repository.id,title, url,techs,likes:repository.likes}
  return response.json(repositories[Indexrepository])
});

app.delete("/repositories/:id", (request, response) => {
  const {id}=request.params
  const Indexrepository = repositories.findIndex(repository => repository.id ===id)
  if(Indexrepository<0){
    return response.status(400).json({error:'Repository not found'})
  }
  repositories.splice(Indexrepository,1)
  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} =request.params
  const findIndex = repositories.findIndex(repository=>repository.id === id)
  if(findIndex<0){
    return response.status(400).json({error:'Repository does not exist'})
  }
  repositories[findIndex].likes++
  return response.json(repositories[findIndex])
});

module.exports = app;
