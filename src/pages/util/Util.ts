class Util {
      constructor() {}

      /**
       * Obtiene la fecha actual en formato: DAY/MONTH/YEAR HH:MM:SS. [27/01/2023 17:50:33]
       * @param dCurrent 
       * @returns 
       */
      getDateCurrentString( dCurrent = new Date() ): string {
            try {
                return new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'medium', timeZone: 'Europe/Madrid' }).format(dCurrent)
            } catch(err){
                return new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'medium', timeZone: 'Europe/Madrid' }).format(new Date())
            }
      }

      /**
       * Obtiene la fecha actual en formato 'YEAR-MOTH-DAY HH-MM-SS' [2023-01-27 09:50:00] para POSTGRESSQL
       * @returns [2023-01-27 09:50:00]
       */
      getDateCurrentForSQL(): string {
            let [dateCurrent, timeCurrent] = (this.getDateCurrentString().trim()).split(',').map(el => el.trim())
            let [dayCurrent, monthCurrent, yearCurrent] = dateCurrent.split('/')
            return `${yearCurrent}-${monthCurrent}-${dayCurrent} ${timeCurrent}`
      }

      /**
       * Data no cambia para tipo de datos timestamp DB
       * @param val 
       * @returns 
       */
      noParse(val: any): any {
            return val
      }

      /**
       * Cambiar formato de BigInt<string> a Integer
       * @param val 
       * @returns 
       */
      parseInteger(val: any): number {
            return parseInt(val, 10)
      }
}

const UtilInstance = new Util()
Object.freeze(UtilInstance)

export default UtilInstance