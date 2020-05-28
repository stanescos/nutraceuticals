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
  var comboRef = firebase.database().ref('combo');



 comboRef.on('value', gotData, errData);
 function gotData(data) {
  var combo = data.val();
  var keys = Object.keys(combo);
  var combo_list = ''
  for (var i = 0; i < keys.length; i++){
    var k = keys[i];
    var comboC = combo[k].combo;

    // Table Generator
    combo_list = combo_list+`<tr>
    <th scope="row">`+(i+1)+`</th>
    <td>`+comboC+`</td>
    </tr>`
  }
document.getElementById('combo_row').innerHTML = combo_list;
}

function showtable(){
  document.querySelector('.tableh').style.display = 'block';
}



function errData(err) {
  console.log(err);
}

  // Listen for form submit
  document.getElementById('combo_form').addEventListener('submit', submitForm);
  // Submit form
  function submitForm(e){
    e.preventDefault();
  
    // Get values
    var product1 = getInputVal('product1');
    var product2 = getInputVal('product2');
    var product3 = getInputVal('product3');
    var product4 = getInputVal('product4');


    var comboP = product1 + ", " + product2;

    if(product3 != ""){
      comboP = comboP + ", " + product3;
    }

   if(product4 != ""){
      comboP = comboP + ", " + product3;
    }

    
  
    // Save product
    saveProduct(comboP);
  
    // Show alert
    document.querySelector('.alert').style.display = 'block';
  
    // Hide alert after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').style.display = 'none';
    },3000);
  
    // Clear form
    document.getElementById('combo_form').reset();
  }
  
  // Function to get form values
  function getInputVal(id){
    return document.getElementById(id).value;
  }
  
  // Save product to firebase
  function saveProduct(comboP){
    var newComboRef = comboRef.push();
    newComboRef.set({
      combo:comboP
    });
  }

  