var histogram = ['hist_A+','hist_A','hist_A-','hist_B+','hist_B','hist_B-','hist_C+','hist_C','hist_C-','hist_D','hist_F'];
var grades = ['max', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'];
var lowerBounds = [100.00, 95.00, 90.00, 85.00, 80.00, 75.00, 70.00, 65.00, 60.00, 55.00, 50.00, 0.00];
function init(){
  document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
  for (i = 0; i < 12; i++){
      document.getElementById(grades[i]).addEventListener('change', changeBounds);
  }
}
function handleFileSelect(event){
  const reader  = new FileReader();
  reader.onload = handleFileLoad;
  reader.readAsText(event.target.files[0]);
}

function handleFileLoad(event){
    console.log(event);
    var data = event.target.result;
    data = data.split(/[\n,]/);
    var name_score = [];
    while (data.length){
        name_score.push(data.splice(0,2));
    }
    Hist_Print(name_score);
    Hist_Change(name_score);
    Highest(name_score);
    Lowest(name_score);
    Mean(name_score);
    Median(name_score);
}
//function to split scores and return only the numbers
function Split(name_score){ 
  const combined = [];
  for (i = 1; i < name_score.length - 1; i++){
    var Score = name_score[i];
    combined[i - 1] = parseFloat(Score[1]);
  }
  return combined;
}
//marks for histogram
function Hist_Mark(score){
  var img = document.createElement("img");
  img.src = "dot.jpg";
  img.id = "dot";
  img.height = 15;
  img.width = 15;
  if (lowerBounds[0] >= score && lowerBounds[1] <= score){
      document.getElementById('hist_A+').appendChild(img);
  }
  for (j = 1; j < 11; j++){
      if (lowerBounds[j] > score && lowerBounds[j+1] <= score){
          document.getElementById(histogram[j]).appendChild(img);
      }
  }
}
//prints histogram
function Hist_Print(name_score){
  let scores = Split(name_score);
  for (i = 0; i < scores.length; i++){
      Hist_Mark(scores[i]);
  }
}
//changes bound for lower bounds
function changeBounds(){
  var validBounds = overlap();
  if (validBounds == 1) {
      console.log(lowerBounds);
      for (i = 0; i < 12; i++){
          document.getElementById(grades[i]).value = lowerBounds[i];
      }
  } else {
      for (i = 0; i < 12; i++){
          lowerBounds[i] = parseFloat(document.getElementById(grades[i]).value);
      }
  }
}
//changes bounds and histogram based on user input
function Bounds(name_score){
  changeBounds();
  clear_Hist();
  console.log(lowerBounds);
  Hist_Print(name_score);
}
//changes histogram
function Hist_Change(name_score){
  for (i = 0; i < 12; i++){
    document.getElementById(grades[i]).addEventListener('change', function(){
      Bounds(name_score);
      } );
  }
}
//clears histogram 
function clear_Hist(){
  for (i = 0; i < 11; i++){
      document.getElementById(histogram[i]).innerHTML = "";
  }
}
//find highest stat and print name
function Highest(name_score){
  const combined = Split(name_score);
  const large = Math.max.apply(Math, combined);
  for (i = 1; i < name_score.length; i++){
    nameScore = name_score[i];
    if (large == nameScore[1]){
      var high = nameScore[0];
    }
  }
  document.getElementById("highest").innerHTML = high;
}
//find lowest stat and print name
function Lowest(name_score){
  const combined = Split(name_score);
  var small = Math.min.apply(Math, combined);
  for (i = 1; i < name_score.length; i++){
    nameScore = name_score[i];
    if (small == nameScore[1]){
      var low = nameScore[0];
    }
  }
    document.getElementById("lowest").innerHTML = low;
}
//find mean and prints
function Mean(name_score){
  var total = 0;
  const combined = Split(name_score);
  for(i = 0; i < combined.length; i++){
    total += combined[i];
  }
  var mean = total/combined.length;
  document.getElementById("mean").innerHTML = mean.toFixed(2);
}
//finds median and prints
function Median(name_score){
  var median = 0;
  const combined = Split(name_score);
  combined.sort(function(a, b){return a - b});
  if (combined.length % 2 == 1){
    var mid = Math.floor(combined.length/2);
    median = combined[mid];
  }
  else if (combined.length % 2 == 0){
    var mid1 = combined[(combined.length/2) - 1];
    var mid2 = combined[(combined.length/2)];
    median = (mid1 + mid2)/2;
  }
  document.getElementById("median").innerHTML = median.toFixed(2);
}
//checks if the bounds overlap then provide an alert
function overlap(){
  for (i = 0; i < 10; i++) {
    if (parseFloat(document.getElementById(grades[i]).value) < parseFloat(document.getElementById(grades[i+1]).value)){
      alert("ERROR INPUT CANNOT BE THE SAME AS OTHER INPUTS");
      return 1;
    } 
  }
    return 0;
}


