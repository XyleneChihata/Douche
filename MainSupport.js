const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const images = document.querySelectorAll('.image-wrapper img');
let currentIndex = 0;
let isAnimating = false;

  /*This check whether the image is still loading and would thus not overlap, it also does an increment in selecting the order of the images*/
const shuffleImages = () => {
  if (!isAnimating) {
    isAnimating = true;
    images[currentIndex].style.opacity = 0;
    currentIndex = Math.floor(Math.random() * images.length);
    images[currentIndex].style.opacity = 1;
    setTimeout(() => {
      isAnimating = false;
    }, 300);
  }
};
  /*This is the shuffle controller 1000 = 1s*/
const shuffleInterval = setInterval(shuffleImages, 5000);

prevBtn.addEventListener('click', () => {
  clearInterval(shuffleInterval);
  if (!isAnimating) {
    isAnimating = true;
    images[currentIndex].style.opacity = 0;
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = images.length - 1;
    }
    images[currentIndex].style.opacity = 1;
    setTimeout(() => {
      isAnimating = false;
      shuffleInterval = setInterval(shuffleImages, 5000);
    }, 300);
  }
});
  /*Event listener for left button*/
nextBtn.addEventListener('click', () => {
  clearInterval(shuffleInterval);
  if (!isAnimating) {
    isAnimating = true;
    images[currentIndex].style.opacity = 0;
    currentIndex++;
    if (currentIndex >= images.length) {
      currentIndex = 0;
    }
    images[currentIndex].style.opacity = 1;
    setTimeout(() => {
      isAnimating = false;
      shuffleInterval = setInterval(shuffleImages, 5000);
    }, 300);
  }
});
/* line breaker ---------------------------------------- */
/* the code for clickable top screen jump */
$(document).ready(function() {
  $('a.image-link').click(function(event) {
    event.preventDefault(); 
    var target = $(this.hash);
    $('html, body').animate({
      scrollTop: target.offset().top 
    }, 1000); 
  });
});
/* line breaker ---------------------------------------- */
// function updateButtonText(selectElement) {
//   var selectedOption = selectElement.options[selectElement.selectedIndex].text;
//   var selectedOptionElement = selectElement.nextElementSibling;
//   selectedOptionElement.textContent = selectedOption;
// }

// document.querySelector(".selected-option").addEventListener("click", function() {
//   this.nextElementSibling.classList.toggle("show");
// });

// document.addEventListener("click", function(event) {
//   var dropdownContent = document.querySelector(".dropdown-content");
//   if (!dropdownContent.contains(event.target)) {
//     dropdownContent.classList.remove("show");
//   }
// });

// var selectedRow = null

/* line breaker ---------------------------------------- */

// function onFormSubmit() {
//     if (validate()) {
//         var formData = readFormData();
//         if (selectedRow == null)
//             insertNewRecord(formData);
//         else
//             updateRecord(formData);
//         resetForm();
//     }
// }

// function readFormData() {
//     var formData = {};
//     formData["fullName"] = document.getElementById("fullName").value;
//     formData["empCode"] = document.getElementById("empCode").value;
//     formData["salary"] = document.getElementById("salary").value;
//     formData["city"] = document.getElementById("city").value;
//     return formData;
// }

// function insertNewRecord(data) {
//     var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
//     var newRow = table.insertRow(table.length);
//     cell1 = newRow.insertCell(0);
//     cell1.innerHTML = data.fullName;
//     cell2 = newRow.insertCell(1);
//     cell2.innerHTML = data.empCode;
//     cell3 = newRow.insertCell(2);
//     cell3.innerHTML = data.salary;
//     cell4 = newRow.insertCell(3);
//     cell4.innerHTML = data.city;
//     cell4 = newRow.insertCell(4);
//     cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
//                        <a onClick="onDelete(this)">Delete</a>`;
// }

// function resetForm() {
//     document.getElementById("fullName").value = "";
//     document.getElementById("empCode").value = "";
//     document.getElementById("salary").value = "";
//     document.getElementById("city").value = "";
//     selectedRow = null;
// }

// function onEdit(td) {
//     selectedRow = td.parentElement.parentElement;
//     document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
//     document.getElementById("empCode").value = selectedRow.cells[1].innerHTML;
//     document.getElementById("salary").value = selectedRow.cells[2].innerHTML;
//     document.getElementById("city").value = selectedRow.cells[3].innerHTML;
// }
// function updateRecord(formData) {
//     selectedRow.cells[0].innerHTML = formData.fullName;
//     selectedRow.cells[1].innerHTML = formData.empCode;
//     selectedRow.cells[2].innerHTML = formData.salary;
//     selectedRow.cells[3].innerHTML = formData.city;
// }

// function onDelete(td) {
//     if (confirm('Are you sure to delete this record ?')) {
//         row = td.parentElement.parentElement;
//         document.getElementById("employeeList").deleteRow(row.rowIndex);
//         resetForm();
//     }
// }
// function validate() {
//     isValid = true;
//     if (document.getElementById("fullName").value == "") {
//         isValid = false;
//         document.getElementById("fullNameValidationError").classList.remove("hide");
//     } else {
//         isValid = true;
//         if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
//             document.getElementById("fullNameValidationError").classList.add("hide");
//     }
//     return isValid;
// }
// const buttons = document.querySelectorAll('.buttonSalesCart');

// // Iterate over each button and add a click event listener
// buttons.forEach(button => {
//     button.addEventListener('click', function() {
//         // Access the data-id attribute of the clicked button
//         const buttonId = button.getAttribute('data-id');
        
//         // Get h3 and p elements based on the button ID
//         const title = document.getElementById(`${buttonId}-title`).textContent;
//         const paragraph = document.getElementById(`${buttonId}-paragraph`).textContent;
        
//         // Call a function to process the data and display it
//         processData(buttonId, title, paragraph);
//     });
// });

// Function that processes the data and displays it
// function processData(id, title, paragraph) {
//   // Modify the data as needed
//   const modifiedData = {
//       id: id,
//       title: `Modified ${title}`, // Modify the title if necessary
//       paragraph: `Modified ${paragraph}` // Modify the paragraph if necessary
//   };

  // // Output the modified data to the display
  // const outputDiv = document.getElementById('output');
  // outputDiv.innerHTML = `
  //     <p>ID: ${modifiedData.id}</p>
  //     <p>Title: ${modifiedData.title}</p>
  //     <p>Paragraph: ${modifiedData.paragraph}</p>
  // `;
// }

// localStorage.setItem('users', JSON.stringify({})); clearing users
