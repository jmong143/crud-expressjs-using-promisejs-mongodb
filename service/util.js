module.exports = {
  isObjectEmpty: (obj) => {
    console.log(">>>>>>>>>>>>>>> aaa")
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }
}
