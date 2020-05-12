var firebaseConfig = {
    apiKey: "AIzaSyDW4EoqW12uSUF3opVtdoQoWSBIpOMufaE",
    authDomain: "nutraceuticos-e6d2c.firebaseapp.com",
    databaseURL: "https://nutraceuticos-e6d2c.firebaseio.com",
    projectId: "nutraceuticos-e6d2c",
    storageBucket: "nutraceuticos-e6d2c.appspot.com",
    messagingSenderId: "176484778272",
    appId: "1:176484778272:web:ac85e76f1afc55794f5745",
    measurementId: "G-JKHHE1RLEM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  
  // Reference product collection
var productRef = firebase.database().ref('products');

// Global Declaration
var name_pro = [];
var knowas = [];
var origin_pro = [];
var score = [];
var main_out = [];
var sec_out = [];
var thi_out = [];
var fou_out = [];
var price = [];
  
 productRef.on('value', gotData, errData);
 function gotData(data) {
  var products = data.val();
  var keys = Object.keys(products);
  var results = '';
  for (var i = 0; i < keys.length; i++){
    var k = keys[i];
     name_pro[i] = products[k].name;
     knowas[i] = products[k].knowas;
     origin_pro[i] = products[k].origin;
     main_out[i] = products[k].main_out;
     sec_out[i]= products[k].sec_out;
     thi_out[i] = products[k].thi_out;
     fou_out[i] = products[k].fou_out;
     price[i] = products[k].price;

    //Table Generator
    results = results+`<tr>
    <th scope="row">`+(i+1)+`</th>
    <td>`+name_pro[i]+`</td>
    <td>`+knowas[i]+`</td>
    <td>`+price[i]+`</td>
    </tr>`
  }
document.getElementById('result_row').innerHTML = results;
}


function errData(err) {
  console.log(err);
}

  
  // Listen for form submit
  document.getElementById('quiz_form').addEventListener('submit', getResult);
  

function getResult(e){
  e.preventDefault();
  var data = {};
  var dataArray = $("form").serializeArray();
  for(var i=0;i<dataArray.length;i++){
    if (dataArray[i].name == "client_benefits" || dataArray[i].name == "client_allergy") {
     if (!data[dataArray[i].name]){
      data[dataArray[i].name] = []
     }
     data[dataArray[i].name].push(dataArray[i].value)
  } else {
      data[dataArray[i].name] = dataArray[i].value;
  }
}
for (var i=0; i<main_out.length-1 || i<sec_out.length-1 || i<thi_out.length-1 || i<fou_out.length-1;i++){
  score[i] = 0;
for(var j=0; j <= data.client_benefits.length-1 ;j++){

  if(main_out[i] == data.client_benefits[j]){
    score[i] += 10;
  }
  if(sec_out[i] == data.client_benefits[j]){
    score[i] += 8;
  }
       if(thi_out[i] == data.client_benefits[j]){
    score[i] += 6;
  }
       if(fou_out[i] == data.client_benefits[j]){
    score[i] += 4;
  }     
}

} 

console.log(score);
document.querySelector('.tableh').style.display = 'block';
}




  

