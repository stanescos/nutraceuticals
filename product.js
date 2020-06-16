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
  var product_list = ''
  for (var i = 0; i < keys.length; i++){
    var k = keys[i];
    var name = products[k].name;
    var knowas = products[k].knowas;

    // Table Generator
    product_list = product_list+`<tr>
    <th scope="row" id=id>`+(i+1)+`</th>
    <td>`+name+`</td>
    <td>`+knowas+`<button type="button" data-toggle="button" aria-pressed="false" autocomplete="off" class="btn btn-sm showEdit" id=`+(i+1)+`>Edit<i class="fa fa-edit"></i></button></td>
    </tr>`

  }
document.getElementById('product_row').innerHTML = product_list;
}

function showtable(){
  document.querySelector('.tableh').style.display = 'block';
  

  $('.showEdit').click(function () {
    var id = $(this).attr('id');
    productRef.on('value', function (data){
      var products = data.val();
      var keys = Object.keys(products);
      var k = keys[id-1];
      $('#name').val(products[k].name)
      $('#knowas').val(products[k].knowas) 
      $('#origin').val(products[k].origin) 
      $('#category').val(products[k].category) 
      $('#uses').val(products[k].uses) 
      $('#source').val(products[k].source) 
      $('#type').val(products[k].type) 
      $('#price').val(products[k].price) 
      $('#main_out').val(products[k].main_out) 
      $('#main_evi').val(products[k].main_evi) 
      $('#main_eff').val(products[k].main_eff) 
      $('#sec_out').val(products[k].sec_out) 
      $('#sec_evi').val(products[k].sec_evi) 
      $('#sec_eff').val(products[k].sec_eff) 
      $('#thi_out').val(products[k].thi_out) 
      $('#thi_evi').val(products[k].thi_evi) 
      $('#thi_eff').val(products[k].thi_eff) 
      $('#fou_out').val(products[k].fou_out) 
      $('#fou_evi').val(products[k].fou_evi) 
      $('#fou_eff').val(products[k].fou_eff) 
      $('#toxicity').val(products[k].toxicity) 
      $('#side_efe').val(products[k].side_efe) 
      $('#warn_fpw').val(products[k].warn_fpw) 
      $('#age_range').val(products[k].age_range) 
      $('#comp1').val(products[k].comp1) 
      $('#comp1_pn').val(products[k].comp1_pn) 
      $('#comp1_evi').val(products[k].ecomp1_evi) 
      $('#comp2').val(products[k].comp2) 
      $('#comp2_pn').val(products[k].comp2_pn) 
      $('#comp2_evi').val(products[k].comp2_evi) 
      $('#main_admin_form').val(products[k].main_admin_form) 
      $('#owtci').val(products[k].owtci) 
      $('#main_dosage').val(products[k].main_dosage) 
      $('#main_dose').val(products[k].main_dose) 
      $('#sec_dosage').val(products[k].sec_dosage) 
      $('#sec_dose').val(products[k].sec_dose) 
      $('#thi_dosage').val(products[k].thi_dosage) 
      $('#thi_dose').val(products[k].thi_dose) 
      $('#fou_dosage').val(products[k].fou_dosage) 
      $('#fou_dose').val(products[k].fou_dose)
      $('.submit').attr('id',k);
      $("html, body").scrollTop(0);
    }, errData);
  });
}



function errData(err) {
  console.log(err);
}

  // Listen for form submit
  document.getElementById('product_form').addEventListener('submit', submitForm);
  
  // Submit form
  function submitForm(e){
    e.preventDefault();
  
    // Get values
    var name = getInputVal('name');
    var knowas = getInputVal('knowas');
    var origin = getInputVal('origin');
    var category = getInputVal('category');
    var uses = getInputVal('uses');
    var source = getInputVal('source');
    var type = getInputVal('type');
    var price = getInputVal('price');
    var main_out = getInputVal('main_out');
    var main_evi = getInputVal('main_evi');
    var main_eff = getInputVal('main_eff');
    var sec_out = getInputVal('sec_out');
    var sec_evi = getInputVal('sec_evi');
    var sec_eff = getInputVal('sec_eff');
    var thi_out = getInputVal('thi_out');
    var thi_evi = getInputVal('thi_evi');
    var thi_eff = getInputVal('thi_eff');
    var fou_out = getInputVal('fou_out');
    var fou_evi = getInputVal('fou_evi');
    var fou_eff = getInputVal('fou_eff');
    var toxicity = getInputVal('toxicity');
    var side_efe = getInputVal('side_efe');
    var warn_fpw = getInputVal('warn_fpw');
    var age_range = getInputVal('age_range');
    var comp1 = getInputVal('comp1');
    var comp1_pn = getInputVal('comp1_pn');
    var comp1_evi = getInputVal('comp1_evi');
    var comp2 = getInputVal('comp2');
    var comp2_pn = getInputVal('comp2_pn');
    var comp2_evi = getInputVal('comp2_evi');
    var main_admin_form = getInputVal('main_admin_form');
    var owtci = getInputVal('owtci');
    var main_dosage = getInputVal('main_dosage');
    var main_dose = getInputVal('main_dose');
    var sec_dosage = getInputVal('sec_dosage');
    var sec_dose = getInputVal('sec_dose');
    var thi_dosage = getInputVal('thi_dosage');
    var thi_dose = getInputVal('thi_dose');
    var fou_dosage = getInputVal('fou_dosage');
    var fou_dose = getInputVal('fou_dose');
    var score = 0;

    
  
    // Save product
    saveProduct(name, knowas, origin, category, uses, source, type, price, main_out, main_evi, main_eff, sec_out, sec_evi, sec_eff, thi_out, thi_evi, thi_eff, fou_out, fou_evi, fou_eff, toxicity, side_efe, warn_fpw, age_range, comp1, comp1_pn, comp1_evi, comp2, comp2_pn, comp2_evi, main_admin_form, owtci, main_dosage, main_dose, sec_dosage, sec_dose, thi_dosage, thi_dose, fou_dosage, fou_dose, score);
  
    // Show alert
    document.querySelector('.alert').style.display = 'block';
  
    // Hide alert after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').style.display = 'none';
    },3000);
  
    // Clear form
    document.getElementById('product_form').reset();
  }
  
  // Function to get form values
  function getInputVal(id){
    return document.getElementById(id).value;
  }
  
  // Save product to firebase
  function saveProduct(name, knowas, origin, category, uses, source, type, price, main_out, main_evi, main_eff, sec_out, sec_evi, sec_eff, thi_out, thi_evi, thi_eff, fou_out, fou_evi, fou_eff, toxicity, side_efe, warn_fpw, age_range, comp1, comp1_pn, comp1_evi, comp2, comp2_pn, comp2_evi, main_admin_form, owtci, main_dosage, main_dose, sec_dosage, sec_dose, thi_dosage, thi_dose, fou_dosage, fou_dose, score){

    if($('.submit').attr('id') == ''){

      var newProductRef = productRef.push();
      newProductRef.set({
        name:name,
        knowas:knowas,
        origin:origin,
        category:category,
        uses:uses,
        source:source,
        type:type,
        price:price,
        main_out:main_out,
        main_evi:main_evi,
        main_eff:main_eff,
        sec_out:sec_out,
        sec_evi:sec_evi,
        sec_eff:sec_eff,
        thi_out:thi_out,
        thi_evi:thi_evi,
        thi_eff:thi_eff,
        fou_out:fou_out,
        fou_evi:fou_evi,
        fou_eff:fou_eff,
        toxicity:toxicity,
        side_efe:side_efe,
        warn_fpw:warn_fpw,
        age_range:age_range,
        comp1:comp1,
        comp1_pn:comp1_pn,
        comp1_evi:comp1_evi,
        comp2:comp2,
        comp2_pn:comp2_pn,
        comp2_evi:comp2_evi,
        main_admin_form:main_admin_form,
        owtci:owtci,
        main_dosage:main_dosage,
        main_dose:main_dose,
        sec_dosage:sec_dosage,
        sec_dose:sec_dose,
        thi_dosage:thi_dosage,
        thi_dose:thi_dose,
        fou_dosage:fou_dosage,
        fou_dose:fou_dose,
        score:score
      });
    }
    else{
      productRef.child($('.submit').attr('id')).update({
        name:name,
        knowas:knowas,
        origin:origin,
        category:category,
        uses:uses,
        source:source,
        type:type,
        price:price,
        main_out:main_out,
        main_evi:main_evi,
        main_eff:main_eff,
        sec_out:sec_out,
        sec_evi:sec_evi,
        sec_eff:sec_eff,
        thi_out:thi_out,
        thi_evi:thi_evi,
        thi_eff:thi_eff,
        fou_out:fou_out,
        fou_evi:fou_evi,
        fou_eff:fou_eff,
        toxicity:toxicity,
        side_efe:side_efe,
        warn_fpw:warn_fpw,
        age_range:age_range,
        comp1:comp1,
        comp1_pn:comp1_pn,
        comp1_evi:comp1_evi,
        comp2:comp2,
        comp2_pn:comp2_pn,
        comp2_evi:comp2_evi,
        main_admin_form:main_admin_form,
        owtci:owtci,
        main_dosage:main_dosage,
        main_dose:main_dose,
        sec_dosage:sec_dosage,
        sec_dose:sec_dose,
        thi_dosage:thi_dosage,
        thi_dose:thi_dose,
        fou_dosage:fou_dosage,
        fou_dose:fou_dose,
        score:score
      });
      $('.submit').attr('id','');
    }
    location.reload();
  }

  