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

  
 productRef.on('value', gotData, errData);
 function gotData(data) {
  var products = data.val();
  var keys = Object.keys(products);
  var results = ''
  for (var i = 0; i < keys.length; i++){
    var k = keys[i];
    var name = products[k].name;
    var origin = products[k].origin;
    var score = products[k].score;
    var main_out = products[k].main_out;
    var price = products[k].price;
   if (score != -1) {
    console.log(name, origin);
  
    // document.getElementById('name'+i).innerHTML = name;
    // document.getElementById('price'+i).innerHTML = price;

    results = results+`<tr>
    <th scope="row">`+(i+1)+`</th>
    <td>`+name+`</td>
    <td>`+price+`</td>
    </tr>`

  }
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
  document.querySelector('.tableh').style.display = 'block';
  // let data = $('#quiz_form').serializeArray()
  var data = {};
  var dataArray = $("form").serializeArray();
  for(var i=0;i<dataArray.length;i++){
    if (dataArray[i].name == "client_benefits") {
     if (!data[dataArray[i].name]){
      data[dataArray[i].name] = []
     }
     data[dataArray[i].name].push(dataArray[i].value)
  } else {
      data[dataArray[i].name] = dataArray[i].value;
  }
}
  console.log(data)
}



  

