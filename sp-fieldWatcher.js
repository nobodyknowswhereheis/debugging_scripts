var field = "nameOfSomeField";    // property to watch
var prop = "value"; // what about the field do you want to watch?

var _field = $('sp-variable-layout').scope().formModel._fields[field];
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
wrapObject(_field,prop);