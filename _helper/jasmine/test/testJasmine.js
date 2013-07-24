function sumContinuous(){
    var args = Array.prototype.slice.call(arguments),
        len = args.length,
        results = 0
    ;

    while(len--){
        results += args[len];
    }

    return results;
}
