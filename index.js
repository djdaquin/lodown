'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the action 
 * Function to each value in the collection.
 * 
 * @param {Array or Object} collection The collection over which to iterate.
 * @param {Function} action The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}

//identify: Designed to take a value and return that value.
//
//@param {any value} value the value to be returned

function identity (value){
    return value;
};

// typeOf: Designed to return the type of the passed value as a string. The outcomes are:
// array, null, date, text, number, undefined, and object
// 
// @param {any value} value the value you wish to know the type of. 

function typeOf(value){
    if(Array.isArray(value)) return "array";
    if(value === null) return "null";
    if(value instanceof Date) return "date";
    return typeof value;
}

// first: Designed to return the first values in an array.
// Returns the first value if no number is given
// 
// @param {Array} arr The array you wish to pull values from
// @param {Number} num Optional. The number of values from the front of the array you wish to return if more than one. 
function first(arr, num){
    if(typeOf(arr) !== "array" || num < 0) return [];
    if(typeOf(num) !== "number") return arr[0];
    if(num > arr.length) return arr;
    if(num > 0){
        return arr.slice(0,num);
    }
}


/**
 * last: Designed to return the last values in an array. 
 * Returns the only the last value if no number is given.
 * 
 * @param {Array} arr The Array you wish to pull values from
 * @param {Number} num Optional. The number of values you wish to pull from the back of the array.
 */
function last (arr, num){
    if(!Array.isArray(arr) || num < 0) return [];
    if(typeOf(num) !== "number" || num === undefined) return arr[arr.length - 1];
    
    return arr.slice(-num)
}

/**
 * indexOf: Designed to return the index of a value in an array.
 * If the value is not contained in the array, returns -1
 * 
 * @param {Array} arr The Array you wish to search through
 * @param {Any Value} value The value you wish to find in the array
 */

function indexOf(arr, value){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === value) return i;
    }
    return -1;
}

/**
 * filter: Designed to show which values in an array pass a test.
 * Will return an array of all objects inside the given array that 
 * return a true value when sent through the given function.
 * 
 * @param {Array} arr The array of values you wish to test.
 * @param {Function} fx The test you wish to use on the values of the
 * array. Will receive the arguments value, index, and collection, 
 * all relating to the current value being looped over in the array. 
 * Must return a boolean value. 
 */

function filter(arr, fx){
    var results = [];
    each(arr, function(value, index, col){
        if(fx(value, index, col)) results.push(value)
    });
    return results;
}

/**
 * reject: Designed to show which values in an array fail a test.
 * Will return an array of all objects inside the given array that 
 * return a false value when sent through the given function.
 * 
 * @param {Array} arr The array of values you wish to test.
 * @param {Function} fx The test you wish to use on the values of the
 * array. Will receive the arguments value, index, and collection, 
 * all relating to the current value being looped over in the array. 
 * Must return a boolean value. 
 */

function reject (arr, fx){
    var results = [];
    each(arr, function(val, i, col){
        if(!fx(val, i, col)) results.push(val);
    });
    return results;    
}

/**
 * partition : Designed to take an array and seperate it into two arrays,
 * Those that pass a test and those that don't. Returns an array with two
 * arrays. Index 0 is an array of values that pass the test. Index 1 is 
 * an array of values that fail the test. 
 * 
 * @param {Array} arr The Array you wish to partition
 * @param {Function} fx The test you wish to use on the values of the
 * array. Will receive the arguments value, index, and collection, 
 * all relating to the current value being looped over in the array. 
 * Must return a boolean value.  
 */

function partition(arr, fx){
    var truthy = filter(arr, fx);
    var falsy = reject(arr, fx);
    return [truthy, falsy];
}

/**
 * unique: Designed to remove duplicates of values from an array and return
 * only the unique values. Returns an array of the unique values. The original
 * array is not affected. 
 * 
 * @param {Array} arr The array you wish to gather the unique values of.
 */

function unique (arr){
    var results = [];
    each(arr,function(val){
        if(indexOf(results, val) === -1) results.push(val);
    });
    return results;
}

/**
 * map: Designed to take all values from a collection (array or object) and 
 * perform a function on each one, then return an array of all of the values after.
 *
 * @param {Array or Object} collection The Array or Object you wish to map. 
 * @param {Function} fx The Function you wish to use on all of the values in 
 * the collection. Will receive the three arguments value, index/key, and the 
 * given array/object. Whatever is returned from this function will be added to
 * the array. 
 */

function map (collection, fx){
    var results = [];
    each(collection, function(val, i, col){
        results.push(fx(val, i, col));
        //Uses "fx" on each value in collection, then pushes it to results
    })
    return results;
}

/**
 * pluck: Designed to take an array of objects and return the values of each
 * at a certain property. Returns an array of all the values, each in the same position
 * as the object it was hosted in was in the given array. 
 *
 * @param {Array of Objects} arr The array of objects you wish to pluck a value from.
 * @param {String} property The Property you wish to pull the value of from each object. 
 */

function pluck (arr, property){
    var plucked = map(arr,function(object, i, array){
        return object[property];
    });
    return plucked;
}

/**
 * contains: Designed to check whether or not a value is in a 
 * given array. Returns a Boolean value: True if the value is in
 * the array, false if it is not. 
 * 
 * @param {Array} array The array you wish to check for a value
 * @param {Any Value} value The Value you wish to check for in the array.
 */

function contains (array, value){
    return indexOf(array, value) === -1 ? false : true;
}

/**
 * every: Designed to check all values in a collection (array or
 * object) and see that they all meet a condition as defined in a 
 * given function. Returns a boolean value; true if every item in the
 * collection returns true, and false is any items fail.
 * If a function is not given, will check if all values are "truthy" or
 * "falsey"
 * 
 * @param {Array or Object} collection The Array or Object you wish to
 * check the values of. 
 * @param {Function} fx The Function that tests each value. Will be passed
 * the arguments value, i/key, and the array/object. Should return a boolean
 * value. 
 */

function every (collection, fx) {
    var booleans = [];
    each(collection, function(value, i, collection){
        if(fx === undefined){
            booleans.push(value ? true : false);
        } else {
            booleans.push(fx(value, i, collection) ? true : false);
        }
    });
    return contains(booleans, false) ? false : true;
}

/**
 * some: Designed to check all values in a collection (array or
 * object) and see that some meet a condition as defined in a 
 * given function. Returns a boolean value; false if every item in the
 * collection returns false, and true is any items pass the test.
 * If a function is not given, will check if all values are "truthy" or
 * "falsey"
 * 
 * @param {Array or Object} collection The Array or Object you wish to
 * check the values of. 
 * @param {Function} fx The Function that tests each value. Will be passed
 * the arguments value, i/key, and the array/object. Should return a boolean
 * value. 
 */

function some (collection, fx) {
    var booleans = [];
    each(collection, function(value, i, collection){
        if(fx === undefined){
            booleans.push(value ? true : false);
        } else {
            booleans.push(fx(value, i, collection) ? true : false);
        }
    });
    return contains(booleans, true) ? true : false;
}

/**
 * reduce: Designed to combine all elements in an array into one value. 
 * Returns this value. 
 * 
 * @param {Array} arr The Array you wish to combine into one value
 * @param {Function} fx The Function you will use to combine all the 
 * values in the array. It will be passed the four arguments Previous Value, 
 * The Current Value being passed over, The Index of the current value, and 
 * the Array itself. The Function should return a combination of the previous
 * value and current value. As the function loops, the returned values are used
 * as the next iteration's previous value.
 * @param {Values} seed The value you wish previous value to start at in your
 * function(fx). If not provided, the first element in the array is used as
 * the previous value and the function will start with Index 1 as opposed to 0
 */

function reduce (arr, fx, seed){
    if(arguments.length < 3){
        var reduced = arr[0];
        for(let i = 1; i < arr.length; i++){
            reduced = fx(reduced, arr[i], i, arr);
        }
    } else {
        var reduced = seed;
        each(arr, function(val, i, arr){
            reduced = fx(reduced, val, i, arr);
        });
    }
    return reduced;
}

/**
 * extend: Designed to combine all properties of multiple objects into
 * one object. You may pass as many objects as you wish into the function. 
 * If two objects share a key, the last object's values will be used. The first
 * object entered will be changed as a side effect as well as returned in the 
 * function. 
 * 
 * @param {Object} obj1 The first object to be used. All follwing objects will
 * be combined into this object.
 * @param {Object} obj2 An object you wish to copy the properties of onto obj1
 * @param {Object} obj3 Optional. You may add as many objects as you wish.
 *
 */

function extend(obj1, obj2, obj3, etc){
    for(let i = 1; i < arguments.length; i++){
        each(arguments[i], function(value, key){
            obj1[key] = value;
        });
    }
    return obj1;
}




module.exports.each = each;
module.exports.identity = identity;
module.exports.typeOf = typeOf;
module.exports.first = first;
module.exports.last = last;
module.exports.indexOf = indexOf;
module.exports.filter = filter;
module.exports.reject = reject;
module.exports.partition = partition;
module.exports.unique = unique;
module.exports.map = map;
module.exports.pluck = pluck;
module.exports.contains = contains;
module.exports.every = every;
module.exports.some = some;
module.exports.reduce = reduce;
module.exports.extend = extend;