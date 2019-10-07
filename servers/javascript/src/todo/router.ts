import { ITodoAPI, typeTodo } from "./types/todo";
import { MongoDBArgs } from "../util/mongodb";
import { getStatus, Router, BodyParser } from "../util/router";

function todoRouter(api: ITodoAPI, bodyParser: BodyParser){
  const router = Router();

  router.get("/request/", (req, res)=>{
    api.r_All().then((values)=>{
      res.status(200)
      res.json(values);
    }).catch((error)=>{
      res.status(getStatus(error))
      res.json(error.toString())
    })
  });

  router.get("/request/keys", (req, res)=>{
    api.r_List().then((values)=>{
      res.status(200)
      res.json(values);
    }).catch((error)=>{
      res.status(getStatus(error))
      res.json(error.toString())
    })
  });

  router.get("/request/:id", (req, res)=>{
    return api.r_Single(req.params.id).then((value)=>{
      res.status(200)
      res.json(value);
    }).catch((error)=>{
      res.status(getStatus(error))
      res.json(error.toString())
    })
  });

  router.post("/create", bodyParser.none(), (req, res)=>{
    const todo = typeTodo(req.body);
    api.c_createItem(todo).then((value)=>{
      res.status(200)
      res.json(value);
    }).catch((error)=>{
      res.status(getStatus(error))
      res.json(error.toString())
    })
  });
  router.get("/finish/:id", (req, res)=>{
    api.u_finishItem(req.params.id).then((value)=>{
      res.status(200)
      res.json(value);
    }).catch((error)=>{
      res.status(getStatus(error))
      res.json(error.toString())
    })
  })
  router.get("/delete/:id", (req, res)=>{
    console.log("deleting: ", req.params.id)
    api.d_deleteItem(req.params.id).then((value)=>{
      res.status(200)
      res.json(value);
    }).catch((error)=>{
      res.status(getStatus(error))
      res.json(error.toString())
    })
  });
  return router;
}

export { todoRouter }
