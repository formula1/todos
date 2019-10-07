import { Router } from "express";
import multer from 'multer';
import Storage from 'multer-gridfs-storage';

console.log(Object.keys(multer));
console.log(Object.keys(Storage));

const MONOG_DB_NAME = "GRID_FS_POST_FILES";

enum ROUTER_ERROR {
  NOT_FOUND = "NOT_FOUND",
  DUPLICATE_FOUND = "DUPLICATE_FOUND"
}


function getStatus(error: any){
  if(!error){
    return 200;
  }
  switch(error.toString()){
    case ROUTER_ERROR.NOT_FOUND: return 404
  }
  return 500;
}

type BodyParser = multer.Instance;

function createBodyParser(mongoUrl: string, db: string = MONOG_DB_NAME): BodyParser{
  const storage = new Storage({
     url: `${mongoUrl}/${db}`
  });
  const bodyParser = multer({
    storage: storage
  });
  return bodyParser;
}

export { Router, ROUTER_ERROR, getStatus, createBodyParser, BodyParser };
