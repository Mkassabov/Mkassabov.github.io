const inputs = document.getElementById("inputs");
const removeBtn = document.getElementById("remove");
const addBtn = document.getElementById("add");
const calcBtn = document.getElementById("calc");

window.onload = () => {
  addBtn.onclick = addInput;
  removeBtn.onclick = removeInput;
  calcBtn.onclick = calc;
  let clearBtns = document.getElementsByClassName("clear-button");
  let selectBtns = document.getElementsByClassName("select-button");
  for(let i = 0; i < clearBtns.length; i++) {
    clearBtns[i].onclick = clearInput;
    selectBtns[i].onclick = selectInputs;
  }
}

const addInput = () => {
  let form = inputs.children[0].cloneNode(true);
  form.children[0].children[0].onclick = clearInput;
  form.children[0].children[1].onclick = selectInputs;
  form.children[1].children[0].value = "";
  inputs.appendChild(form);
  removeBtn.disabled = false;
}

const removeInput = () => {
  let n = inputs.childElementCount;
  if(!(n <= 2)) {
    inputs.children[n - 1].remove();
  }

  if( n - 1 <= 2) {
    removeBtn.disabled = true;
  }
}

const clearInput = e => e.srcElement.parentElement.parentElement.children[1].children[0].value = "";
const selectInputs = e => e.srcElement.parentElement.parentElement.children[1].children[0].select();

const calc = () => {
  document.getElementById("result").textContent = Math.round(main() * 100);
  console.log(`LSM Score Total: ${main()}`)
}

// these are put together by hand,  90% sure they aren't complete,  but they are good enough for some rat project
const WORD_CATEGORIES = {
  PERSONAL_PRONOUNS: ["i", "me", "we", "us", "you", "she", "her", "he", "him", "they", "them", "myself", "ourselves", "yourself", "yourselves", "himself", "herself", "itself", "themselves", "my", "your", "his", "our", "their", "mine", "yours", "hers", "ours", "theirs"], 
  IMPERSONAL_PRONOUNS: ["it", "that", "which", "who", "whom", "whose", "whichever", "whoever", "whomever", "this", "these", "those", "anybody", "anyone", "anything", "each", "either", "everybody", "everyone", "everything", "neither", "nobody", "no one", "nothing", "one", "somebody", "someone", "something", "both", "few", "many", "several", "all", "any", "most", "none", "some", "what", "its"], 
  ARTICLES: ["a", "an", "the"], 
  CONJUNCTIONS: ["for", "and", "nor", "but", "or", "yet", "so", "after", "although", "as", "as if", "as long as", "as much as", "as soon as", "as though", "because", "before", "by the time", "even if", "even though", "if", "in order that", "in case", "lest", "once", "only if", "provided that", "since", "so that", "than", "that", "though", "till", "unless", "until", "when", "whenever", "where", "wherever", "while", "both", "either", "whether"], 
  PREPOSITIONS: ["abhorrent to", "abound in", "absent from", "absorbed in", "accompanied by", "accused of", "add to", "addicted to", "adjacent to", "admit of", "admit into", "adapt to", "adhere to", "afraid of", "affection for", "affectionate to", "agree with", "aim at", "alarmed at", "allot to", "alternative to", "ambition for", "angry with", "anxious for", "apart from", "apathy towards", "apology for", "apply for", "appointed to", "aptitude for", "argue against", "arrive at", "ascend to", "ashamed of", "asked for", "assured of", "at lunch", "attend to", "authority on", "aware of", "bad at", "beneficial to", "bias towards", "blind to", "boast of", "burden with", "by heart", "care for", "cast aside", "catch at", "cause for", "charge with", "combination of", "compare to", "compatible with", "competent for", "complain to", "comply with", "concern for", "confidence in", "congratulate on", "consist of", "contemporary of", "contrary to", "contribution to", "control over", "convinced of", "cope with", "count upon", "a curse for", "cruise to", "deal with", "depend on", "desire to", "die by", "die for", "die from", "die of", "different from", "difficulty in", "disappointed at", "divide among", "divide between", "dwell in", "dwell upon", "eligible for", "enter into", "entitled to", "equal to", "essential for", "exception to", "exclude from", "experience in", "face with", "fail in", "faith in", "fed up with", "fond of", "genius for", "get into", "give in", "go down", "good at", "guilty of", "hanker after", "ignorant of", "imposed on", "incapable of", "indebted to,  for", "independent of", "indulge in", "innocent of", "inquiry into", "insist on", "in spite of", "interest in", "interfere with", "laugh at", "lead to", "liberate from,  in", "monument to", "mourn for", "a necessity for", "object to", "obliged to,  for", "originate from", "penalty for,  with", "perfect for", "play with", "popular for", "pray for", "prefer to", "respect for", "respond to", "retire from", "return to", "revolt against", "run-on", "shout at", "smile at", "a solution to", "sorry for", "suffer from", "suited to", "superior to", "sympathy for", "taste for,  of", "true to", "valid for", "walk-up"], 
  AUXILIARY_VERBS: ["be", "am", "are", "is", "was", "were", "being", "been", "can", "could", "date", "do", "does", "did", "have", "has", "had", "having", "may", "might", "must", "need", "ought", "shall", "should", "will", "would"], 
  HIGH_FREQUENCY_ADVERBS: ["not", "also", "very", "often", "however", "too", "usually", "really", "early", "never", "always", "sometimes", "together", "likely", "simply", "generally", "instead", "actually", "again", "rather", "almost", "especially", "ever", "quickly", "probably", "already", "below", "directly", "therefore", "else", "thus", "easily", "eventually", "exactly", "certainly", "normally", "currently", "extremely", "finally", "constantly", "properly", "soon", "specifically", "ahead", "daily", "highly", "immediately", "relatively", "slowly", "fairly", "primarily", "completely", "ultimately", "widely", "recently", "seriously", "frequently", "fully", "mostly", "naturally", "nearly", "occasionally", "carefully", "clearly", "essentially", "possibly", "slightly", "somewhat", "equally", "greatly", "necessarily", "personally", "rarely", "regularly", "similarly", "basically", "closely", "effectively", "initially", "literally", "mainly", "merely", "gently", "hopefully", "originally", "roughly", "significantly", "totally", "twice", "elsewhere", "everywhere", "obviously", "perfectly", "physically", "successfully", "suddenly", "truly", "virtually", "altogether", "anyway", "automatically", "deeply", "definitely", "deliberately", "hardly", "readily", "terribly", "unfortunately", "forth", "briefly", "moreover", "strongly", "honestly", "previously", "as", "there", "when", "how", "so", "up", "out", "no", "only", "well", "then", "first", "where", "why", "now", "around", "once", "down", "off", "here", "tonight", "away", "today", "far", "quite", "later", "above", "yet", "maybe", "otherwise", "near", "forward", "somewhere", "anywhere", "please", "forever", "somehow", "absolutely", "abroad", "yeah", "nowhere", "tomorrow", "yesterday", "the", "to", "in", "on", "by", "more", "about", "such", "through", "new", "just", "any", "each", "much", "before", "between", "free", "right", "best", "since", "both", "sure", "without", "back", "better", "enough", "lot", "small", "though", "less", "little", "under", "next", "hard", "real", "left", "least", "short", "last", "within", "along", "lower", "true", "bad", "across", "clear", "easy", "full", "close", "late", "proper", "fast", "wide", "item", "wrong", "ago", "behind", "quick", "straight", "direct", "extra", "morning", "pretty", "overall", "alone", "bright", "flat", "whatever", "slow", "clean", "fresh", "whenever", "cheap", "thin", "cool", "fair", "fine", "smooth", "false", "thick", "collect", "nearby", "wild", "apart", "none", "strange", "tourist", "aside", "loud", "super", "tight", "gross", "ill", "downtown", "honest", "ok", "pray", "weekly"], 
  NEGATIONS: ["no", "not", "none", "no one", "nobody", "nothing", "neither", "nowhere", "never", "doesn't", "isn't", "wasn't", "shouldn't", "wouldn't", "couldn't", "won't", "can't", "don't", "doesnt", "isnt", "wasnt", "shouldnt", "wouldnt", "couldnt", "wont", "cant", "dont"], 
  QUANTIFIERS: ["much", "little", "bit", "all", "enough", "more", "most", "less", "least", "some", "any", "lot", "lots", "plenty", "many", "few", "several", "majority"]
}

// check the amount of interesections between string and array
// used to calculate occurances of word category words in conversation
const contains = function(str, array) {
  let regex = new RegExp(" " + array.reduce((acc, c) => `${acc} | ${c}`) + " ", "g")
  return (str.toLowerCase().match(regex) || []).length;
}

const main = function() {
  // load conversations
  let people = Array.from(document.getElementsByClassName("text-area")).map(e => e.value);
  
  // generate individual LSM score
  let peopleObjects = [];
  for(let person = 0; person < people.length; person++) {
    peopleObjects[person] = {};
    let length = people[person].split(" ").length;
    for(const category in WORD_CATEGORIES) {
      peopleObjects[person][category] = contains(people[person], WORD_CATEGORIES[category]) / length;
    }
  }

  console.log(peopleObjects);
  
  // compare individual LSM scores and generate group LSM score
  let lsmScoreTotal = 0;
  for(const category in peopleObjects[0]) {
    // find group LSM score
    let totalLSM = 0;
    for(let person = 0; person < peopleObjects.length; person++) {
      totalLSM += peopleObjects[person][category];
    }
    console.log(totalLSM);
    // compare indivudal and group LSM scores
    for(let person = 0; person < peopleObjects.length; person++) {
      lsmScoreTotal += 1 - ((Math.abs(2 * peopleObjects[person][category] - totalLSM)) / (0.0001 + totalLSM))
    }
  }
  lsmScoreTotal /= Object.keys(peopleObjects[0]).length * peopleObjects.length;
  return lsmScoreTotal;
}