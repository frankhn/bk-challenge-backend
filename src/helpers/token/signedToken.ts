import jwt from 'jsonwebtoken';
import 'dotenv/config';


const { SECRETKEY } = process.env
/**
 *
 */
export default class SignedToken {
  /**
   * @param {*}
   * @returns {*} 
   */
  public static tokenGenerator(...args:any): any {
    return jwt.sign({ ...args[0], exp: Date.now() + (60*60*24*1000) },
    `${SECRETKEY}`);
  }
}
