/**
 * @classdesc A View contains methods of displaying a data type.
 * A View object is a function that can be called, but also has custom properties
 * like an object literal does.
 *
 * Construct a new View object, taking a function acting on `data`.
 * The `this` inside the function definition refers to the data given.
 * Provide the default display by passing a function with zero parameters.
 * ```js
 * let data = { text: 'some data', id: 'my-id', value: 42 }
 * let spanview = new View(function () { return `<span>${this.text}</span>` }, data)
 * ```
 *
 * Get the default display by calling the view as a function.
 * ```js
 * spanview() // `<span>some data</span>`
 * ```
 *
 * *(Alternatively, you can pass `null` to the constructor instead of a function, so that
 * calling the view, `spanview()`, will throw a ReferenceError. This feature is useful
 * for static views, which do not have default displays.)*
 *
 * Add more displays to a view. Displays are functions that render the data. You gave the
 * default display during construction, and you can give more optional displays,
 * with any number and type of parameters. *Each display you add must be a named function.*
 * Again, `this` refers to the data passed to the view during construction.
 * ```js
 * spanview.addDisplay(function custom1(content) { // the function name is required
 *   return `<span id="${this.id}">${content}</span>`
 * })
 * ```
 *
 * Get the display by calling the named function as an “own property” of the view.
 * ```js
 * spanview.custom1('my content is great') // `<span id="my-id">my content is great</span>`
 * ```
 *
 * You may optionally pass a `this_arg` argument, to override the behavior of `this`
 * inside the function, if you have other data you want to use.
 * ```js
 * let other_data = { text: 'other data', id: 'your-id', value: false }
 * spanview.addDisplay(function custom2(content) {
 *   return `<span id="${this.id}">${content}</span>`
 * }, other_data)
 * ```
 * (However, this should be rare, because each view should correspond to one data type.
 * If you have another data type, you should really construct a new view.)
 *
 * ```js
 * spanview.custom2('your content sucks') // `<span id="your-id">your content sucks</span>`
 * ```
 *
 * @extends Function
 */
class View extends Function {
  /**
   * @summary Construct a new View object.
   * @description Give a function serving as this view’s default display. Any `this` in the function
   * will refer to the data given.
   * Instead, you can pass `null`, which causes calling `this()` to throw a ReferenceError.
   * @version STABLE
   * @param {?function():string} fn the default display, where `this` refers to the given data;
   *                                or `null` if you do not want a default display
   * @param {*} data the data that this view displays
   */
  constructor(fn, data) {
    if (fn === null) {
      super("throw new ReferenceError('This view does not have a default display.')")
    } else {
      let returned = fn.call(data)
        .replace(/\\/g, '\\\\') // double-escape any escaped backslashes in the original string
        .replace(/`/g, '\\`')   // escape any backtick literals in the original string
      super("return `" + returned + "`")
    }
    /** @private @final */ this._DATA = data
  }
  /**
   * @summary Adds a new method for displaying HTML output.
   * @version STABLE
   * @param   {function(?):string} fn a **named** function returning the display’s HTML output
   * @param   {*=} this_arg optionally pass in other data to use for the display
   * @returns {View} `this`
   */
  addDisplay(fn, this_arg = this._DATA) {
    this[fn.name] = function (...args) {
      return fn.call(this_arg, ...args)
    }
    return this
  }
}

module.exports = View
