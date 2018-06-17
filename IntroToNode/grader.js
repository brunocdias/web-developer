function average(arr){
    var sum=0;
    score.forEach(function(score){
        sum += score;
    })
    var res = sum/score.length;
    return Math.round(res);
}

var score = [90, 98, 89, 100, 100, 86, 94];
console.log(average(score));