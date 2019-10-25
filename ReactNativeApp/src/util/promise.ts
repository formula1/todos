
type ToRun = ()=>any;

export class Queue {
  queue: Array<ToRun> = [];
  currentlyRunning: boolean;
  public run(toRun: ToRun){
    return this.runOrWait().then(()=>{
      return Promise.resolve().then(()=>{
        return toRun()
      })
    }).then((result)=>{
      this.runNext()
      return result
    }, (error)=>{
      this.runNext()
      throw error;
    })
  }
  runOrWait(){
    return new Promise((res)=>{
      if(!this.currentlyRunning){
        this.currentlyRunning = true
        res()
      }else{
        this.queue.push(res)
      }
    });
  }
  runNext(){
    if(this.queue.length > 0){
      this.queue.shift()()
    }else{
      this.currentlyRunning = false
    }
  }
}

export class IndexedQueue {
  queues: { [id:string]: Array<ToRun> } ={};
  public run(id: string, fn: ToRun){
    return this.runOrWait(id).then(()=>{
      return Promise.resolve().then(()=>{
        return fn()
      })
    }).then((result)=>{
      this.runNext(id)
      return result
    }, (error)=>{
      this.runNext(id)
      throw error;
    })
  }

  runOrWait(id: string){
    return new Promise((res)=>{
      if(!(id in this.queues)){
        this.queues[id] = [];
        res()
      }else{
        this.queues[id].push(res)
      }
    })
  }

  runNext(id: string){
    if(this.queues[id].length > 0){
      this.queues[id].shift()()
    }else{
      delete this.queues[id]
    }
  }

}
