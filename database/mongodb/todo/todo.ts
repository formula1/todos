
const TABLE_NAME = "TODO";

const createCollection = function(db, user, input){
  return new Promise((res, rej)=>{
    db.createCollection(TABLE_NAME, (err, res)=>{
      err ? rej(err) : res()
    });
  }).then(()=>{
    db[TABLE_NAME].createIndex({ owner: 1 })
  });
}


const database = {
  "createItem": function(db, user, input){
    if(!user || !user.id){
      return Promise.reject(new Error("Bad user"));
    }
    if(!input.description || input.description === ""){
      return Promise.reject(new Error("needs description"));
    }

    return new Promise((res, rej)=>{
      db.collection(TABLE_NAME)
      .insertOne({
        owner: user.id,
        description: input.description,
        created: Date.now(),
        finished: 0
      }, function(err, result) {
        err ? rej(err) : res(result)
      });
    });
  },
  "requestItem": {
    "list": function(user, input){
      return new Promise((res, rej)=>{
        dbo.collection(TABLE_NAME)
        .find({ owner: user.id })
        .toArray(function(err, result) {
          err ? rej(err) : res(result);
        });
      });
    },
    "single": function(user, input){
      return new Promise((res, rej)=>{
        dbo.collection(TABLE_NAME)
        .findOne(
          { _id : input._id },
          function(err, result) {
            err ? rej(err) : res(result);
          }
        );
      });
    }
  },
  "updateItem": {
    "finishItem": function(user, input){
      return new Promise((res, rej)=>{
        dbo.collection(TABLE_NAME)
        .updateOne(
          { _id: input._id, finished: 0 },
          { finished: Date.now() },
          function(err, result) {
            err ? rej(err) : res(result);
          }
        );
      });
    }
  },
  "deleteItem": function(user, input){
    return new Promise((res, rej)=>{
      dbo.collection(TABLE_NAME)
      .deleteOne(
        { _id: input._id},
        function(err, result) {
          err ? rej(err) : res(result);
        }
      );
    });
  }
}
