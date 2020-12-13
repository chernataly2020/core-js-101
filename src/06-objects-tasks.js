/* ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
    return {
        width,
        height,
        getArea() {
            return this.width * this.height;
        },
    };
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
    /*Метод JSON.stringify() преобразует значение JavaScript в строку JSON,
    возможно с заменой значений, если указана функция замены,
    или с включением только определённых свойств, если указан массив замены.*/
    return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
    //Метод JSON.parse() разбирает строку JSON,
    //возможно с преобразованием получаемого в процессе разбора значения.
    const obj = JSON.parse(json);

    //Метод  Object.values() возвращает массив значений перечисляемых свойств объекта в том же порядке что и цикл for...in.
    //Разница между циклом и методом в том, что цикл перечисляет свойства и из цепочки прототипов.
    const values = Object.values(obj);

    //Возвращает ссылку на функцию Object, создавшую прототип экземпляра.
    //Все объекты наследуют свойство constructor из своего прототипа
    return new proto.constructor(...values);
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
    answer: '',
    element: function(value) {
        this.error(1);

        //Метод Object.create() создаёт новый объект с указанным прототипом и свойствами.

        let obj = Object.create(cssSelectorBuilder);
        obj.i = 1;
        obj.answer = this.answer + value;
        return obj;
    },

    id: function(value) {
        this.error(2);
        let obj = Object.create(cssSelectorBuilder);
        obj.i = 2;
        obj.answer = this.answer + '#' + value;
        return obj;
    },

    class: function(value) {
        this.error(3);
        let obj = Object.create(cssSelectorBuilder);
        obj.i = 3;
        obj.answer = this.answer + '.' + value;
        return obj;
    },

    attr: function(value) {
        this.error(4);
        let obj = Object.create(cssSelectorBuilder);
        obj.i = 4;
        obj.answer = this.answer + '[' + value + ']';
        return obj;
    },

    pseudoClass: function(value) {
        this.error(5);
        let obj = Object.create(cssSelectorBuilder);
        obj.i = 5;
        obj.answer = this.answer + ':' + value;
        return obj;
    },

    pseudoElement: function(value) {
        this.error(6);
        let obj = Object.create(cssSelectorBuilder);
        obj.i = 6;
        obj.answer = this.answer + '::' + value;
        return obj;
    },

    combine: function(selector1, combinator, selector2) {
        let obj = Object.create(cssSelectorBuilder);
        obj.answer = selector1.answer + ' ' + combinator + ' ' + selector2.answer;
        return obj;
    },
    stringify: function() {
        return this.answer;
    },

    //Обработка ошибок
    error: function(nom_i) {
        if (this.i > nom_i) throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
        if (this.i == nom_i && (nom_i == 1 || nom_i == 2 || nom_i == 6)) throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    },
};


module.exports = {
    Rectangle,
    getJSON,
    fromJSON,
    cssSelectorBuilder,
};

