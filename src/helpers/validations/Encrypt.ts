import bcrypt from 'bcryptjs'

/**
 * Encryption handler
 */
class Encrypt {
  /**
     * @author frank
     * @param {*} _value
     * @returns {*} value
     */
  protected static salt(): any {
    return bcrypt.genSaltSync(10);
  }


  public static encrypt(value: string): any {
    return bcrypt.hashSync(value, this.salt());
  }


  public static decrypt(value: string, storedValue: string): any {
    return bcrypt.compareSync(value, storedValue);
  }
}

export default Encrypt;
