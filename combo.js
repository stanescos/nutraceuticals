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

  var form = ["product1", "product2", "product3", "product4"];
  var count = 4;
  console.log(form);

 comboRef.on('value', gotData, errData);
 function gotData(data) {
  var combo = data.val();
  var keys = Object.keys(combo);
  var combo_list = ''
  for (var i = 0; i < keys.length; i++){
    var k = keys[i];
    var comboC = combo[k].combo;

    // Table Generator
    //add edit button
    combo_list = combo_list+`<tr>
    <th scope="row">`+(i+1)+`</th>
    <td>`+comboC+`<button type="button" data-toggle="button" aria-pressed="false" autocomplete="off" class="btn btn-sm showEdit" id=`+(i+1)+`>Edit <i class="fa fa-edit"></i></button></td>
    </tr>`
  }
document.getElementById('combo_row').innerHTML = combo_list;
}

function showtable(){
  document.querySelector('.tableh').style.display = 'block';

  $('.showEdit').click(function () {
    var id = $(this).attr('id');
    comboRef.on('value', function(data) {
      var combos = data.val();
      var keys = Object.keys(combos);
      var k = keys[id-1];
      var result = combos[k].combo.split(', ');
      $('#product1').val(result[0]);
      $('#product2').val(result[1]);
      $('#product3').val(result[2]);
      $('#product4').val(result[3]);
      if(result.length > 4) {
        for(let i=4; i < result.length; i++) {
          count++;
          $('<p> <label name="Product ' + (i+1) + '"> Product ' + (i+1) + '</label> <input type="text" name="product' + (i+1) +'" id="product' + (i+1) + '"> </p>').insertBefore('p.full');
          $('.modal-body').append('<hr> <span name="product'+ (i+1) +'">Product ' + (i+1) + '</span> <input type="text" style="display: none;"> <div class="btnCollection"> <button type="button" class="btn btn-success saveEdit" title="Save Changes" style="display: none;"><i class="fa fa-check"></i></button> <button type="button" class="btn btn-primary editField" title="Edit Field"><i class="fa fa-edit"></i></button> <button type="button" class="btn btn-danger deleteField" title="Delete Field"><i class="fa fa-trash"></i></button> </div>');
          $('#product' + (i+1)).val(result[i]);
          form.push("product" + count);
          console.log(form);
        }
      }
      $('.submit').attr('id',k);
    }, errData);
  });
}



function errData(err) {
  console.log(err);
}

  // Listen for form submit
  document.getElementById('submit').addEventListener('click', submitForm);
  // Submit form
  function submitForm(e){
    e.preventDefault();
    var array = [];
    for(let i=0; i<form.length; i++) {
      console.log(form[i]);
      if($("#" + form[i]).val() !== "") {
        array[i] = $("#" + form[i]).val();
      }
    }
    console.log(array.join(", "));
    // Get values
    comboP = array.join(", ");

    
  
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
    console.log($('.submit').attr('id'));
    if($('.submit').attr('id') !== 'undefined'){
      var newComboRef = comboRef.push();
      newComboRef.set({
        combo:comboP
      });
    }
    else {
      comboRef.child($('.submit').attr('id')).update({
        combo:comboP
      });
      $('.submit').attr('id','');
      location.reload();
    }
  }
  //end
  $(document).on("click", ".btnCollection .editField", function() {
    console.log('clicked');
    $(this).parent().prev().toggle();
    $(this).parent().prev().val($(this).parent().prev().prev().text());
    $(this).parent().prev().prev().toggle();
    $(this).prev().toggle();
  });

  $(document).on("click", ".btnCollection .saveEdit", function() {
    const text = $(this).parent().prev().prev().text();
    $("label[name|='" + text + "']").text($(this).parent().prev().val());
    $("label").attr("name", $(this).parent().prev().val());
    console.log('clicked');
    
    $(this).parent().prev().prev().text($(this).parent().prev().val());
    $(this).parent().prev().toggle();
    $(this).parent().prev().prev().toggle();
    $(this).toggle();
  });

  $(document).on("click", ".btnCollection .deleteField", function () {
    const text = $(this).parent().prev().prev().text();
    $("label[name|='" + text + "']").parent().remove();
    const index = form.indexOf($(this).parent().prev().prev().attr('name'));
    if (index > -1) {
      form.splice(index, 1);
    }
    console.log(form);
    $(this).parent().prev().prev().prev().remove();
    $(this).parent().prev().prev().remove();
    $(this).parent().prev().remove();
    $(this).parent().next().remove();
    $(this).parent().remove();
  });

  $('.modal-footer .addField').click(function () {
    count++;
    $('<p> <label name="Product ' + count + '"> Product ' + count + '</label> <input type="text" name="product' + count +'" id="product' + count + '"> </p>').insertBefore('p.full');
    $('.modal-body').append('<hr> <span name="product'+count+'">Product ' + count + '</span> <input type="text" style="display: none;"> <div class="btnCollection"> <button type="button" class="btn btn-success saveEdit" title="Save Changes" style="display: none;"><i class="fa fa-check"></i></button> <button type="button" class="btn btn-primary editField" title="Edit Field"><i class="fa fa-edit"></i></button> <button type="button" class="btn btn-danger deleteField" title="Delete Field"><i class="fa fa-trash"></i></button> </div>');
    form.push("product" + count);
    console.log(form);
  });