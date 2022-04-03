const caseCheck = (word, text) => {
  //Array of characters
  word = word.split("");
  let inp = text.split(" ").pop();
  //loop through every character in ino
  for (let i in inp) {
    //if input character matches with character in word no need to change
    if (inp[i] == word[i]) {
      continue;
    } else if (inp[i].toUpperCase() == word[i]) {
      //if inp[i] when converted to uppercase matches word[i] it means word[i] needs to be lowercase
      word.splice(i, 1, word[i].toLowerCase());
    } else {
      //word[i] needs to be uppercase
      word.splice(i, 1, word[i].toUpperCase());
    }
  }
  //array to string
  return word.join("");
};
export default caseCheck;
