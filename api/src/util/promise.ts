
enum PROMISE_RESULT {
  PENDING = "PENDING",
  FAILURE = "FAILURE",
  SUCCESS = "SUCCESS"
}

type Listener<ResultType> = (value: ResultType)=> any;

class SingleResultPromise<ResultType>{
  private promise: Promise<any>
  private status: PROMISE_RESULT = PROMISE_RESULT.PENDING
  private result: void|ResultType;
  private error: void|any
  private waiters: Array<[Listener<ResultType>, Listener<any>]> = []

  constructor(p: void | Promise<any>){
    if(p){
      this.setPromise(p);
    }
  }

  setPromise(p: Promise<ResultType>){
    this.promise = p;
    p.then((result: ResultType)=>{
      this.status = PROMISE_RESULT.SUCCESS
      this.result = result;
      this.waiters.forEach((waiters)=>{
        waiters[0](result)
      });
      this.waiters = []
    }, (error)=>{
      this.status = PROMISE_RESULT.FAILURE
      this.error = error;
      this.waiters.forEach((waiters)=>{
        waiters[1](error)
      });
      this.waiters = []
    })
  }

  public waitForResult(): Promise<ResultType>{
    return new Promise((res, rej)=>{
      switch(this.status){
        case PROMISE_RESULT.PENDING:
          return this.waiters.push([res, rej]);
        case PROMISE_RESULT.FAILURE:
          return rej(this.error)
        case PROMISE_RESULT.SUCCESS:
          return res(this.result as ResultType)
      }
    })
  }
}

export {
  SingleResultPromise
};
