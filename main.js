if ($(".dtContent > td.largebody").text().indexOf("VIP") >= 0) {
  alert("exists");
}

title = document.title;
if (title !== true) {
  document.title = "First Graphix - " + title;
}

//The below function hides the "SIZE" row and renames the "COLOR" row on the options page for certain items. If you want to add to this, add an object to the valuesToReplace variable. Follow the format of the other objects (Ice machine stickers, Laminated Tablet Menus). The colorText property is what will show up instead of "COLOR".
function changeSizeColorText() {
  const valuesToReplace = [
    { productName: "Ice Machine Stickers", colorText: "STATE" },
    { productName: "Laminated Tablet Menus", colorText: "PRICING TIER" },
  ];
  const tableData = $(".tablesorter tbody td").toArray();
  if (tableData.length !== 0) {
    const productName = $(".tablesorter tbody tr td")[1].innerText;
    valuesToReplace.forEach((item) => {
      if (productName === item.productName) {
        tableData.forEach((data, index) => {
          if (data.innerText === "SIZE") {
            $(data).css("display", "none");
            let nextEl = tableData[index + 1];
            $(nextEl).css("display", "none");
          }
          if (data.innerText === "COLOR") {
            data.innerHTML = `<strong>${item.colorText}</strong>`;
          }
        });
      }
    });
  }

  changeSizeColorText();

  //This adds a note at the bottom of the options page for Laminated Table Menus showing the Box Combo prices with the Price Tier.
  if (productName === "Laminated Tablet Menus") {
    $(".tablesorter").append(`
     <div class="pricingTierInfo">
         <h3>Pricing Tiers with their Box Combo price</h3>
         <ul>
             <li>Base: $8.99</li>
             <li>Base15: $8.99</li>
             <li>BLVille: $8.99</li>
             <li>C726: $9.99</li>
             <li>High: $9.89</li>
             <li>HighCA: $9.89</li>
             <li>Mid: $9.59</li>
             <li>PartyPacks: $8.99</li>
             <li>Value: $8.49</li>
           </ul>
       </div>`);
  }
}

if (window.location.pathname === "/checkout/6-payment_NEW.php") {
  $("#custPOBox section").append(`
     <div id="spend-category-form"style="text-align: left; margin-top:10px">
       <input type="checkbox" value="LRM/ACI Programs_ACI - Active Lifestyle">LRM/ACI Programs_ACI - Active Lifestyle</input><br>
       <input type="checkbox" value="LRM/ACI Programs_ACI - Business Development">LRM/ACI Programs_ACI - Business Development</input><br>
       <input type="checkbox" value="LRM/ACI Programs_ACI - Pet Welfare">LRM/ACI Programs_ACI - Pet Welfare</input><br>
       <input type="checkbox" value="LRM/ACI Programs_ACI - Caniac Marketing">LRM/ACI Programs_ACI - Caniac Marketing</input><br>
       <input type="checkbox" value="LRM/ACI Programs_ACI - Education">LRM/ACI Programs_ACI - Education</input><br>
       <input type="checkbox" value="LRM/ACI Programs_ACI - Feeding the Hungry">LRM/ACI Programs_ACI - Feeding the Hungry</input><br>
       <input type="checkbox" value="LRM/ACI Programs_ACI - Other">LRM/ACI Programs_ACI - Other</input><br>
       <input type="checkbox" value="LRM/ACI Programs_Community Relations Charitable Contribution">LRM/ACI Programs_Community Relations Charitable Contribution</input><br>
       <input type="checkbox" value="LRM/ACI Programs_Fundraiser Donation">LRM/ACI Programs_Fundraiser Donation</input><br>
       <input type="checkbox" value="Production_Production - Graphics">Production_Production - Graphics</input><br>
       <input type="checkbox" value="Production_Restaurant Graphics">Production_Restaurant Graphics</input><br>
       <input type="checkbox" value="Preopening Advertising_Not Applicable">Preopening Advertising_Not Applicable</input><br>
       <input type="checkbox" value="Recruiting_Not Applicable">Recruiting_Not Applicable</input><br>
       <input type="checkbox" value="Office Supplies_Not Applicable">Office Supplies_Not Applicable</input><br>
       <input type="checkbox" value="Production_Production - Print">Production_Production - Print</input><br>
       <input type="checkbox" value="Cane's Love_Not Applicable">Cane's Love_Not Applicable</input><br>
       <input type="checkbox" value="Restaurant Supplies_Not Applicable">Restaurant Supplies_Not Applicable</input><br>
     </div>`);
  function updateSpendCategory() {
    let checkedSpendCategories = [];
    $("#spend-category-form input").each((index, input) => {
      if (input.checked) {
        checkedSpendCategories.push(input.value);
      }
    });
    let finalString = checkedSpendCategories.join(", ");
    $("#customerPO").val(finalString);
  }
  $("#spend-category-form input").on("change", () => {
    updateSpendCategory();
  });
}

function askIfCustomized() {
  const tableData = $(".tablesorter tbody td").toArray();
  const productList = [
    "Achievement Awards - Blue",
    "Achievement Awards - Green",
    "Achievement Awards - Orange",
    "Achievement Awards - Purple",
    "Achievement Awards - Red",
    "Bravery Achievement Awards",
    "Dental Achievement Awards",
    "Spanish Achievement Awards",
    "Spanish Achievement Awards - Half Size",
    "Sports Achievement Awards",
    "Summer Achievement Awards",
    "VBS Achievement Awards",
  ];
  if (tableData.length !== 0) {
    const productName = $(".tablesorter tbody tr td")[1].innerText;
    if (productList.includes(productName)) {
      console.log("Hey");
      tableData.forEach((data, index) => {
        if (data.innerText === "PAPER") {
          data.innerHTML = `<strong>Did you customize this item?</strong>`;
          setTimeout(() => {
            $("#paperID option")[0].innerText = "Yes";
            $("#paperID option")[1].innerText = "No";
            console.log(localStorage.getItem("isCustom"));
            if (localStorage.getItem("isCustom") !== null) {
              console.log("Is custom");
              $("#paperID option")[0].selected = "selected";
              localStorage.removeItem("isCustom");
              document.getElementById("itemPrice").innerText = "$15.00";
            } else {
              console.log("Is not custom");
              console.log($("#paperID option")[0]);
              $("#paperID option")[1].selected = "selected";
              localStorage.removeItem("isCustom");
              document.getElementById("itemPrice").innerText = "$10.00";
            }
          }, 250);
        }
      });
    }
  }
}

askIfCustomized();
function setIsCustomized() {
  const templateName = $(".templateName a")[0].attributes.title.value;
  if (templateName === "Award Test") {
    let fields = [];
    const inputs = $("#show_userform table tbody tr td:nth-child(2) input");
    inputs.each((index, input) => {
      if (input.value.length > 0) fields.push(input.value);
    });
    console.log(fields);
    if (fields.length > 0) {
      localStorage.setItem("isCustom", "true");
    } else {
      localStorage.removeItem("isCustom");
    }
  }
}

$("#proceedButton").on("click", () => setIsCustomized());
