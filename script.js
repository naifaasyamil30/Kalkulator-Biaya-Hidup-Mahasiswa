let saldo = 0;
let dataPengeluaran = {};
let chart;

document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();
  saldo = parseInt(document.getElementById("saldo").value);
  document.getElementById("saldoTersisa").innerText = saldo;

  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("pengeluaranPage").classList.remove("hidden");

  const ctx = document.getElementById('chartPengeluaran').getContext('2d');
  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: ['#D2B48C','#C19A6B','#8B5E3C','#deb887','#a0522d','#cd853f']
      }]
    },
    options: {
      responsive: false,
      plugins: { 
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              let value = context.raw || 0;
              return `${label}: Rp ${value}`;
            }
          }
        }
      }
    }
  });
});

document.getElementById("formPengeluaran").addEventListener("submit", function(e){
  e.preventDefault();
  let kategori = document.getElementById("kategori").value;
  let jumlah = parseInt(document.getElementById("jumlah").value);

  saldo -= jumlah;
  document.getElementById("saldoTersisa").innerText = saldo;

  // update data
  if(dataPengeluaran[kategori]){
    dataPengeluaran[kategori] += jumlah;
  } else {
    dataPengeluaran[kategori] = jumlah;
  }

  // update tabel
  let tbody = document.querySelector("#tabelPengeluaran tbody");
  let row = tbody.insertRow();
  row.insertCell(0).innerText = kategori;
  row.insertCell(1).innerText = jumlah;

  // update chart
  chart.data.labels = Object.keys(dataPengeluaran);
  chart.data.datasets[0].data = Object.values(dataPengeluaran);
  chart.update();

  document.getElementById("formPengeluaran").reset();
});

document.getElementById("resetBtn").addEventListener("click", function(){
  dataPengeluaran = {};
  saldo = parseInt(document.getElementById("saldo").value);
  document.getElementById("saldoTersisa").innerText = saldo;

  document.querySelector("#tabelPengeluaran tbody").innerHTML = "";
  chart.data.labels = [];
  chart.data.datasets[0].data = [];
  chart.update();
});
