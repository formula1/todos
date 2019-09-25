
/*

User login/registers
- Check if current IP address is not considered MAL
  - Large amount of incorrect registrations coming from a single IP
- Check if theres already a name
  - Check if IPaddress
  - Check if name is target of Mal
    - Large amount of Ips all targeting single Name
  - Yes - Check if the current registration process exists
    - Yes -
- Ensure the login/register values are correct
  - If register


*/


const USER_TABLE_NAME = "User";
const AUTHENTICATION_TABLE_NAME = "Authentication";
const TOKEN_TABLE_NAME = "Token";
const PERMISSION_TABLE_NAME = "Permission";

const createCollection = function(db, user, input){
  return new Promise((res, rej)=>{
    db.createCollection(USER_TABLE_NAME, (err, res)=>{
      err ? rej(err) : res()
    });
  }).then(()=>{
    db[USER_TABLE_NAME].createIndex({ name: 1 })
  }).then(()=>{
    return new Promise((res, rej)=>{
      db.createCollection(AUTHENTICATION_TABLE_NAME, (err, res)=>{
        err ? rej(err) : res()
      });
    });
  }).then(()=>{
    db[USER_TABLE_NAME].createIndex({ name: 1 })
  });
}

const UserModel = {
  name: "string",
  authority: "string[]",
}

const AuthenticationModel = {
  user: "ObjectId",
  type: "string",
  permissionToken: "string"
}

const TokenModel = {
  user: "ObjectId",
  authenticationModel:
  type: string,
}




const database = {
  "register": function(db, user, input){
    if(user){
      return Promise.reject(new Error("Currently Logged In"));
    }
    if(!input.authentication){
      return Promise.reject(new Error("User needs initial Authenticator"));
    }

    if(!input.name){
      return Promise.reject(new Error(""));
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
  "update": {
    "changeName": function(user, input){

    },
    "giveAuthority": function(user, input){

    },
    "removeAuthority": function(user, input){

    },
    "addAuthentication": function(user, input){

    },
    "removeAuthentication": function(user, input){

    },
    "login": function(user, input){
    },
    "logout": function(user, input){
    },
  },
  "delete": function(user, input){
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
