/**
 * Non-constructable (static) implementation example:
 * ```js
 * class Util implements ViewableStatic {
 *   static view(data) {
 *     return new View(null, data)
 *       // call Util.view(person).person()
 *       .addDisplay(function person() {
 *         return `<span>${this.name}</span>`
 *       })
 *       // call Util.view(person).cap(capitalize)
 *       .addDisplay(function cap(capitalize) {
 *         return `<h1>${(capitalize) ? this.name.toUpperCase() : this.name}</h1>`
 *       })
 *   }
 * }
 * ```
 * @interface
 */
class ViewableStatic {
  /**
   * @summary Render data as a string.
   * @see VIEW
   * @param   {*} data any data to render
   * @returns {View}
   */
  static view(data) { return new View(null, data) }
}

module.exports = ViewableStatic
