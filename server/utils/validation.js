var isRealString = (str)=>{
    return typeof str && str.trim().length > 0;
};

module.exports = {
    isRealString
};