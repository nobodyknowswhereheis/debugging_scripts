//debuggingStuff
//client script
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === "") {
        return;
    }
    try {
        var a = {};
        a.debug();
    } catch (ex) {
        var ga = new GlideAjax("ClientLogger");
        ga.addParam("sysparm_name", "log");
        ga.addParam("sysparm_msg", ex.stack);

        ga.getXMLAnswer();
    }
    window.onerror = function (message, source, lineno, colno, error) {
        var Errmsg = message + "\n\n" + source + "\n\n" + lineno + "\n\n" + colno + "\n\n" + error
        var ga = new GlideAjax("ClientLogger");
        ga.addParam("sysparm_name", "log");
        ga.addParam("sysparm_msg", ex.stack);

        ga.getXMLAnswer();

    };
}
//Script Include:
var ClientLogger = Class.create();
ClientLogger.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    log: function () {
        var logEntry = "****************************\n\n";
        logEntry += "Client Error logged\n\n";
        logEntry += this.getParameter("sysparm_msg");
        logEntry += "\n\n****************************";
        gs.log(logEntry);
    },
    type: "ClientLogger"
});
