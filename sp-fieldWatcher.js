// get a stack trace when a specific proprty changes on a field in service portal.

var field = "nameOfSomeField";    // field to watch eq. short_description
var prop = "value"; // what about the field do you want to watch? eg. value, mandatory, read-only, visible

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
