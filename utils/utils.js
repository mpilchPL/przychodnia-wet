// ######## getCharsIndexes ##########
// returns an array of indexes on which the given 'char' appears in string, ignores upper cases
// example: elephant.getCharsIndexes('e') returns [0,2]
String.prototype.getCharsIndexes = function (char) { 
   var letter = char.toLowerCase();
   var word = this.toLowerCase();
   var charsPos = new Array();
   for (i = 0; i < word.length; i++) {
      if (word.charAt(i) == letter)
         charsPos.push(i);
   }
   return charsPos;
};

String.prototype.insertAt = function (loc,strChunk) { 
    return (this.valueOf().substr(0,loc)) + strChunk + (this.valueOf().substr(loc));
};

String.prototype.replaceAt = function (index, newChar) { 
   if (this.length < 1) return;
   if (index == 0) {
      return (newChar + (this.valueOf().substr(index + 1)));
   }
   if (index == this.length -1 ) {
      return ((this.valueOf().substr(0,index)) + newChar);
   }
   return (this.valueOf().substr(0,index)) + newChar + (this.valueOf().substr(index + 1));
};

Array.prototype.getRandom = function () { 
   var n = Math.floor(Math.random() * this.length);
   return this[n];
};

