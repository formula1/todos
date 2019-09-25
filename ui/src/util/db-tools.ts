var i = 0;
export function uniqueID(){
  return (
    Date.now().toString(32)
    + i.toString(32)
    + Math.random().toString(32).substring(2)
  );
}
