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
var main_out = [];
var sec_out = [];
var thi_out = [];
var fou_out = [];
var price = [];
var aux = [];
var source= [];
var sourceR = [];;
  
 productRef.on('value', gotData, errData);
 function gotData(data) {
  var products = data.val();
  var keys = Object.keys(products);
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
     source[i] = products[k].source;
     var name1 = name_pro[i];
     var knowas1 = knowas[i];
     var price1 = price[i];
     var score1 = 0;
     var sourceA = [];
     sourceA = source[i].split(", ");
     sourceR.push(sourceA);
     var outcome1 = '';
     aux.push({score1,name1,knowas1,price1,outcome1});
  }

}

function errData(err) {
  console.log(err);
}

  
  // Listen for form submit
  $('form').submit(function(e){
  e.preventDefault();
  var data_aux = aux.map(Element=>{
    return Element;
  });
  var results = '';
  var data = {};
  var dataArray = $("form").serializeArray();
  for(var i=0;i<dataArray.length;i++){
    if (dataArray[i].name == "client_benefits" || dataArray[i].name == "client_allergy" || dataArray[i].name == "rclient_benefits") {
     if (!data[dataArray[i].name]){
      data[dataArray[i].name] = []
     }
     data[dataArray[i].name].push(dataArray[i].value)
  } else {
      data[dataArray[i].name] = dataArray[i].value;
  }
}

//source
  //asource = sourceR[n];
  if (data.client_allergy != null){
  for(var p=0;p<sourceR.length;p++){
    var asource = sourceR[p];
    for(var x=0;x<asource.length;x++){
   for(var o=0; o <= data.client_allergy.length-1 ;o++){ 
    if(asource[x] == data.client_allergy[o]){
    data_aux[p].score1 = -1;
   }//for client allergy
  }//for asource
}
}
  }

if (data.client_benefits != null){
for (var i=0; i<main_out.length || i<sec_out.length || i<thi_out.length || i<fou_out.length;i++){
  if(data_aux[i].score1 != -1){
  data_aux[i].score1 = 0;
  data_aux[i].outcome1 = '';
for(var j=0; j <= data.client_benefits.length ;j++){
  if(main_out[i] == data.client_benefits[j]){
    data_aux[i].score1 += 10 + (data.rclient_benefits[j]*2);
    data_aux[i].outcome1 = main_out[i] + ' | ' + data_aux[i].outcome1;
  }
  if(sec_out[i] == data.client_benefits[j]){
    data_aux[i].score1 += 8 + (data.rclient_benefits[j]*2);
    data_aux[i].outcome1 = sec_out[i] + ' | ' + data_aux[i].outcome1;
  }
       if(thi_out[i] == data.client_benefits[j]){
    data_aux[i].score1 += 6 + (data.rclient_benefits[j]*2);
    data_aux[i].outcome1 = thi_out[i] + ' | ' + data_aux[i].outcome1;
  }
       if(fou_out[i] == data.client_benefits[j]){
    data_aux[i].score1 += 4 + (data.rclient_benefits[j]*2);
    data_aux[i].outcome1 = fou_out[i] + ' | ' + data_aux[i].outcome1;
  }     
}
  }
} 
console.log(data_aux);
data_aux.sort(function(current, next){return next.score1 - current.score1});

for(var i=0;i<data_aux.length;i++){
  if(data_aux[0].score1 - 6 <= data_aux[i].score1){
//Table Generator
    results = results+`<tr>
    <th scope="row">`+(i+1)+`</th>
    <td>`+data_aux[i].name1+`</td>
    <td>`+data_aux[i].knowas1+`</td>
    <td>`+data_aux[i].price1+`</td>
    <td>`+data_aux[i].outcome1+`</td>
    </tr>`}
}

document.getElementById('result_row').innerHTML = results;
document.querySelector('.tableh').style.display = 'block';
} 
  }
  )
$('.custom-control-input').change(function() {
  if ($(this).prop('checked')) {
    $(this).parent().find('.custom-range').prop('disabled', false);
    $(this).parent().find('.rangeh').show();
  }
  else{
    $(this).parent().find('.custom-range').prop('disabled', true);
    $(this).parent().find('.rangeh').hide();
  }
}
)


// function rangeshowup(checkboxElem) {
// if (checkboxElem.checked == true){
// //document.querySelector('.tableh').style.display = 'block';
// $(checkboxElem).parent().find('rangeh').style.display = 'block';

// }
// else {
//   //document.querySelector('.rangeh').style.display = 'none';
//   $(checkboxElem).parent().find('rangeh').style.display = 'none';
// }
// }