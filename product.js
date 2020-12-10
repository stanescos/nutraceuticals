var url = "https://nutraceuticals.herokuapp.com"

$(document).ready(function () {
  async function getProducts() {
    try {
      let prod = '';
      const response = await fetch(`${url}/product`, {
        method: 'get'
      });
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        prod = prod + `<option value="${data[i].id_prod}">${data[i].product}</option>`
      }
      document.getElementById('selectProduct').innerHTML = prod;
    } catch (error) {
      console.log(error);
    }
  }
  async function getTopics() {
    try {
      let topic = '';
      const response = await fetch(`${url}/topics`, {
        method: 'get'
      });
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        topic = topic + `<option value="${data[i].id_topic}">${data[i].topic}</option>`
      }
      document.getElementById('selectTopic').innerHTML = topic;
    } catch (error) {
      console.log(error);
    }
  }
  async function getUses() {
    try {
      let use = '';
      const response = await fetch(`${url}/uses`, {
        method: 'get'
      });
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        use = use + `<option value="${data[i].id_use}">${data[i].use}</option>`
      }
      document.getElementById('selectUse').innerHTML = use;
    } catch (error) {
      console.log(error);
    }
  }
  getUses();
  getTopics();
  getProducts();
});

// Listen for form submit
document.getElementById('product_form').addEventListener('submit', submitFormProduct);
document.getElementById('proFinal_form').addEventListener('submit', submitFormProfinal);

// Submit form
function submitFormProduct(e) {
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var knowas = getInputVal('knowas');
  var origin = getInputVal('origin');
  var category = getInputVal('category');
  var history = getInputVal('history');
  var source = getInputVal('source');
  var type = getInputVal('type');
  var refer = getInputVal('refer');
  var examine = getInputVal('examine');
  var desc = getInputVal('desc')
  var toxicity = getInputVal('toxicity');
  var side_efe = getInputVal('side_efe');
  var warn_fpw = getInputVal('warn_fpw');
  var age_range = getInputVal('age_range');
  var wbc = getInputVal('wbc');


  // Save product

  saveProduct(name, knowas, origin, category, history, source, type, refer, examine, desc, toxicity, side_efe, warn_fpw, age_range, wbc);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert').style.display = 'none';
  }, 3000);

  // Clear form
  document.getElementById('product_form').reset();
}

function submitFormProfinal(e) {
  e.preventDefault();

  console.log($("#selectProduct").val())
  var product = $("#selectProduct").val();
  var topic = $("#selectTopic").val();
  var use = $("#selectUse").val();
  var evidence = $("#selectEvidence").val();
  var consistency = $("#selectConsistency").val();
  var efficiency = $("#selectEfficiency").val();
  var suggestion = $("#selectSuggestion").val();

  saveProfinal(product, topic, use, evidence, consistency, efficiency, suggestion);

  document.getElementById('proFinal_form').reset();
}

// Function to get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save product to firebase
async function saveProduct(name, knowas, origin, category, history, source, type, refer, examine, desc, toxicity, side_efe, warn_fpw, age_range, wbc) {
  try {
    const response = await fetch(`${url}/product`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        product: name,
        knowas: knowas,
        origin: origin,
        category: category,
        history: history,
        source: source,
        type: type,
        refer: refer,
        examine: examine,
        desc: desc,
        toxicity: toxicity,
        side_efe: side_efe,
        warn: warn_fpw,
        age_range: age_range,
        wbc: wbc
      })
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  location.reload();
}

async function saveProfinal(product, topic, use, evidence, consistency, efficiency, suggestion) {
  try {
    const response = await fetch(`${url}/profinal/create`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        product: product,
        evidence: evidence,
        use: use,
        consistency: consistency,
        topic: topic,
        efficiency: efficiency,
        suggestion: suggestion
      })
    });
    const data = await response.json();
    console.log(data)
  } catch (error) {
    console.log(error);
  }
}


