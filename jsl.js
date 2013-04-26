jsl = window.jsl || {};

jsl = function () {
  
  var outputMessage = "";
  var delimeter = "; ";
  var stackDelimeter = " <-- ";
  var currentDelimeter = delimeter;
  var showEverythingArgs = ["ts", "fn", "arg",  "acst"];
  
  
  /**
   * Public function for logging debug data
   * Parameters values: "arg", "fn", "cst", "acst", "ts" 
   */
  vlog = function() {
    var clr = arguments.callee.caller;
    if (arguments.length === 0) {
      arguments = showEverythingArgs;
    }
    for (var i = 0, l = arguments.length; i < l; i++) {
      switch (arguments[i]) {
        case "arg" : 
          showArguments(clr);
          break;
        case "fn" : 
          showFunctionName(clr);
          break;
        case "cst" : 
          showCallStack(clr, false);
          break;
        case "acst" : 
          showCallStack(clr, true);
          break;
        case "ts" : 
          showTimestamp(clr);
          break;
      } 
    }
    console.log(outputMessage);
    outputMessage = "";
  };
  
  /**
   * Adds message to output
   */
  addMessage = function(message) {
    outputMessage += message;
    outputMessage += currentDelimeter;
  };
  
  /**
   * Provides line with function arguments
   * @param
   *    fn - function
   */
  showArguments = function(fn) {
    var outStr = "Arguments: ";
    var args = fn.arguments;
    for (i = 0, l = args.length - 1; i < l; i++) {
      outStr += args[i];
      outStr += ", ";
    }
    outStr += args[l];
    addMessage(outStr);
  };
  
 
  /**
   * Provides line with function name
   * @param
   *    fn - function
   */
  showFunctionName = function(fn) {
    var outStr = "Function: ";
    outStr += fn.name;
    addMessage(outStr);
  };
  
  /**
   * Provides line with function call stack with/without arguments
   * @param
   *    fn - function
   * @param
   *    showArgs - Boolean show/not arguments
   */
  showCallStack = function(fn, showArgs) {
    currentDelimeter = "";
    addMessage("CALL STACK: ");
    var cllr = fn.caller;
    while (cllr) {
      currentDelimeter = delimeter;
      showFunctionName(cllr);
      if (showArgs) {
        currentDelimeter = stackDelimeter;
        showArguments(cllr);
      }
      cllr = cllr.caller;
    }
    currentDelimeter = delimeter;
    addMessage("PAGE");
  };
  
  
  /**
   * Provides line with function call timestamp
   */
  showTimestamp = function() {
    var outStr = "Time: ";
    outStr += (new Date()).toLocaleString();
    addMessage(outStr);
  };

  
  return {
    "vlog" :  vlog
  }

}();
