// Elements
const btcValueEl = document.getElementById('btc-value');
const phpValueEl = document.getElementById('php-value');
const toggleSvg = document.querySelector('.toggle-icon');
const qrContainer = document.getElementById('qr-code');

// Fetch sheet data
const sheetID = "1PfZSMz5ZJvidWmEPkXgZjGRxhwxoknZvX5mZ8V0bvGM";
const apiKey  = "AIzaSyDIUxdcZMFwg_RwRc-vF5C5uEAt_xn9gu0";
const tabName = window.location.pathname.split("/").pop().replace(".html", "");
const range = `${tabName}!A2:G2`;
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    const row = data.values[0];

    const svgCode    = row[0] || "<svg width='174' height='174'><rect width='174' height='174' fill='orange'/></svg>";
    const btc        = parseFloat(row[1] || "0.00000001");
    const php        = parseFloat(row[2] || "100.0111");
    const owner      = row[3] || "";
    const status     = row[5] || "No Owner";
    const dateClaimed = row[6] || "";

    // BTC & PHP
    btcValueEl.innerText = `₿ ${btc.toFixed(8)}`;
    phpValueEl.innerText = `PHP ${php.toFixed(2)}`;
    phpValueEl.style.display = "inline";

    // Owner/status
    const ownerBlock = document.getElementById("owner-block");
    const noOwner    = document.getElementById("no-owner");
    const statusLine = document.getElementById("status-line");

    if (status === "No Owner") {
      ownerBlock.style.display = "none";
      noOwner.style.display = "block";
      statusLine.style.display = "none";
    } else if (status === "Owned") {
      ownerBlock.style.display = "block";
      noOwner.style.display = "none";
      statusLine.style.display = "none";
      document.getElementById("owner").innerText = owner;
    } else if (status === "Claimed") {
      ownerBlock.style.display = "block";
      noOwner.style.display = "none";
      statusLine.style.display = "block";
      document.getElementById("owner").innerText = owner;
      statusLine.innerText = dateClaimed
        ? `STATUS: CLAIMED • ${dateClaimed}`
        : "STATUS: CLAIMED";
    }

    // Inject SVG code directly
    qrContainer.innerHTML = svgCode;
  })
  .catch(err => console.error(err));

// Reload page on SVG click
toggleSvg.style.cursor = "pointer";
toggleSvg.addEventListener("click", () => location.reload());