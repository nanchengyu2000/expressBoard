import mysql from 'mysql2'
const db=mysql.createPool({
  host:process.env.HOST,
  user:process.env.USER,
  password:process.env.PASSWORD,
  database:process.env.DATABASE
})
function executeQuery(query:string,params?:Array<any>):any {
  if (!params) {
      return new Promise((resolve:any, reject:any) => {
          db.query(query, (error:object, results:any) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        });
      }); 
  }
  return new Promise((resolve:any, reject:any) => {
      db.query(query,params,(error:object, results:any) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
  
}
export default executeQuery
