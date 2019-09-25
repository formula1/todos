

import fetch from "fetch";

const todoRouter = function (database){
  const router = new Router();
  router.post("/create", (req, res)=>{
    database
  })
  router.post("/update/:id", (req, res)=>{

  })
  router.delete("/update/:id", (req, res)=>{
    
  })
  router.get("/request/", (req, res)=>{

  })
  router.get("/request/:id", (req, res)=>{

  })
  return router;
}
