/*
    Wrap the property of an existing object in get/set methods.
    Example: wrapObject(window'accessibility_emabled');
    This will log a stack trace whenever window.accessibility_enabled is set.
*/
var obj = "nameOfSomeObject";   // object you want to watch
var prop = "nameOfSomeProp";    // property to watch

var wrapObject = function (obj, prop){
        var prop_;
        Object.defineProperty(obj, prop,
            {
                get: function () {
                    return prop_;
                },
                set: function (newVal) {
                    console.trace();
                    prop_ = newVal;
                }
            }
        );
    }
wrapObject(obj,prop);