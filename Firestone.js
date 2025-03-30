// firestore.js

// Clears the debt form inputs
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("reason").value = "";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";
}

// Toggles the display of debt details
function toggleCollapse(header) {
  if (event.target.type === 'checkbox') return;
  const details = header.nextElementSibling;
  const arrow = header.querySelector('.toggle-arrow');
  if (details.style.display === "flex") {
    details.style.display = "none";
    arrow.style.transform = "rotate(90deg)";
  } else {
    details.style.display = "flex";
    arrow.style.transform = "rotate(-90deg)";
  }
}

// Adds a new debt to Firestore and updates the UI
function addDebt() {
  const name = document.getElementById("name").value;
  const amount = document.getElementById("amount").value;
  const reason = document.getElementById("reason").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  
  if (name && amount && reason && date && time) {
    const user = auth.currentUser;
    if (user) {
      db.collection("debts").doc(user.uid).collection("userDebts").add({
        name,
        amount,
        reason,
        date,
        time,
        paid: false
      }).then((docRef) => {
        console.log("Debt added with ID:", docRef.id);
        const listItem = document.createElement("div");
        listItem.classList.add("list-item");
        // Save the Firestore document ID for future reference
        listItem.dataset.debtId = docRef.id;
        listItem.innerHTML = `
          <div class="header" onclick="toggleCollapse(this)">
            <div class="checkbox-container">
              <input type="checkbox" onclick="markPaid(event, this)">
            </div>
            <div class="header-content">
              <span><strong>${name}</strong> - R${amount}</span>
            </div>
            <span class="toggle-arrow">></span>
          </div>
          <div class="details">
            <div><strong>Reason:</strong> ${reason}</div>
            <div><strong>Date:</strong> ${date}</div>
            <div><strong>Time:</strong> ${time}</div>
          </div>
        `;
        document.getElementById("unpaidList").appendChild(listItem);
        clearForm();
      }).catch((error) => {
        console.error("Error adding debt:", error.message);
      });
    } else {
      console.error("User is not signed in.");
    }
  }
}

// Marks a debt as paid in Firestore and updates the UI
function markPaid(event, checkbox) {
  event.stopPropagation();
  const listItem = checkbox.closest(".list-item");
  listItem.classList.add("paid");
  
  const user = auth.currentUser;
  const debtId = listItem.dataset.debtId;
  
  if (user && debtId) {
    db.collection("debts").doc(user.uid).collection("userDebts").doc(debtId)
      .update({ paid: true })
      .then(() => {
        console.log("Debt marked as paid in Firestore");
        checkbox.remove();
        document.getElementById("paidList").appendChild(listItem);
      })
      .catch((error) => {
        console.error("Error marking debt as paid:", error.message);
      });
  }
}
