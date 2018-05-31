const utils = {
  convertType: function(type) {
    switch(type) {
      case '永久會員':
        return 1;
      case '正式會員':
        return 2;
      case '團體會員':
        return 3;
      case '學生會員':
        return 4;
      case '停權會員':
        return 5;
    }
  }
};

module.exports = utils;
