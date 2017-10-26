/**
 * Constructable implementation example:
 * ```js
 * class Person implements Viewable {
 *   constructor(name) {
 *     this.name = name
 *   }
 *   get view() {
 *     // call person.view()
 *     return new View(function () {
 *       return `<span>${this.name}</span>`
 *     }, this)
 *       // call person.view.cap(capitalize)
 *       .addDisplay(function cap(capitalize) {
 *         return `<h1>${(capitalize) ? this.name.toUpperCase() : this.name}</h1>`
 *       })
 *   }
 * }
 * ```
 * @interface
 */
class Viewable {
  /**
   * @summary Render this object as a string.
   * @see VIEW
   * @type {View}
   */
  get view() { return new View(null, this) }
}

module.exports = Viewable
