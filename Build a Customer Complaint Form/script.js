const fullName = document.getElementById('full-name');
const email = document.getElementById('email');
const orderNo = document.getElementById('order-no');
const productCode = document.getElementById('product-code');
const quantity = document.getElementById('quantity');
const complaintsGroup = document.getElementById('complaints-group');
const complaintDescription = document.getElementById('complaint-description');
const solutionGroup = document.getElementById('solutions-group');
const solutionDescription = document.getElementById('solution-description');
const submitButton = document.getElementById('submit-btn');
const messageBox = document.getElementById('message-box');

// Function to collect form data
const getFormData = () => {
  // Check if at least one complaint checkbox is checked
  const complaintCheckboxes = document.querySelectorAll('input[name="complaint"]');
  const isAnyComplaintChecked = Array.from(complaintCheckboxes).some(checkbox => checkbox.checked);
  
  // Check if a solution radio is checked
  const solutionRadios = document.querySelectorAll('input[name="solutions"]'); // Fixed name from "solution" to "solutions"
  const isAnySolutionChecked = Array.from(solutionRadios).some(radio => radio.checked);
  
  return {
    fullname: fullName.value.trim(),
    email: email.value.trim(),
    'order-no': orderNo.value.trim(),
    'product-code': productCode.value.trim(),
    quantity: quantity.value.trim(),
    'complaints-checked': isAnyComplaintChecked,
    'complaint-description': complaintDescription.value.trim(),
    'solution-checked': isAnySolutionChecked,
    'solution-description': solutionDescription.value.trim()
  };
};

// Function to validate the form data
const validateForm = (formData) => {
  // Check if complaint description is required (when "other" is checked)
  const otherComplaint = document.getElementById('other-complaint');
  const needsComplaintDesc = otherComplaint && otherComplaint.checked;
  
  // Check if solution description is required (when "other" is checked)
  const otherSolution = document.getElementById('other-solution');
  const needsSolutionDesc = otherSolution && otherSolution.checked;
  
  // Basic validation for all required fields
  if (!formData.fullname || 
      !formData.email || 
      !formData['order-no'] || 
      !formData['product-code'] || 
      !formData.quantity || 
      !formData['complaints-checked'] ||
      (needsComplaintDesc && !formData['complaint-description']) ||
      !formData['solution-checked'] ||
      (needsSolutionDesc && !formData['solution-description'])) {
    return false;
  }
  
  return true;
};

// Name validation
fullName.addEventListener('change', (e) => {
  const name = e.target.value.trim();
  const isValidName = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]{2,}$/.test(name);
  
  if (!isValidName) {
    setValidationStyle(fullName, false);
    fullName.setCustomValidity('Please enter a valid name');
  } else {
    setValidationStyle(fullName, true);
    fullName.setCustomValidity('');
  }
});

// Email validation
email.addEventListener('change', (e) => {
  const emailValue = e.target.value.trim();
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue);
  
  if (!isValidEmail) {
    setValidationStyle(email, false);
    email.setCustomValidity('Please enter a valid email address');
  } else {
    setValidationStyle(email, true);
    email.setCustomValidity('');
  }
});

// Order number validation
orderNo.addEventListener('change', (e) => {
  const orderNoValue = e.target.value.trim();
  const isValidOrderNo = /^2024\d{6}$/.test(orderNoValue);
  
  if (!isValidOrderNo) {
    setValidationStyle(orderNo, false);
    orderNo.setCustomValidity('Please enter a valid order number (format: 2024######)');
  } else {
    setValidationStyle(orderNo, true);
    orderNo.setCustomValidity('');
  }
});

// Product code validation
productCode.addEventListener('change', (e) => {
  const productCodeValue = e.target.value.trim();
  const isValidProductCode = /^[a-zA-Z]{2}\d{2}-[a-zA-Z]{1}\d{3}[a-zA-Z]{2}\d{1}$/.test(productCodeValue);
  
  if (!isValidProductCode) {
    setValidationStyle(productCode, false);
    productCode.setCustomValidity('Please enter a valid product code (format: XX##-X###XX#)');
  } else {
    setValidationStyle(productCode, true);
    productCode.setCustomValidity('');
  }
});

// Quantity validation
quantity.addEventListener('change', (e) => {
  const quantityValue = e.target.value.trim();
  const isValidQuantity = /^[1-9]\d*$/.test(quantityValue);
  
  if (!isValidQuantity) {
    setValidationStyle(quantity, false);
    quantity.setCustomValidity('Please enter a valid quantity (must be a positive number)');
  } else {
    setValidationStyle(quantity, true);
    quantity.setCustomValidity('');
  }
});

// Complaint checkboxes validation
const complaintCheckboxes = document.querySelectorAll('input[name="complaint"]');
complaintCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const isAtLeastOneChecked = Array.from(complaintCheckboxes).some(cb => cb.checked);
    setValidationStyle(complaintsGroup, isAtLeastOneChecked);
    
    // Toggle "Other" complaint description visibility and validation
    const otherComplaint = document.getElementById('other-complaint');
    if (otherComplaint.checked) {
      // Trigger validation for complaint description
      const event = new Event('change', { bubbles: true });
      complaintDescription.dispatchEvent(event);
    }
  });
});

// Complaint description validation
complaintDescription.addEventListener('change', (e) => {
  const otherComplaint = document.getElementById('other-complaint');
  if (otherComplaint && otherComplaint.checked) {
    const description = e.target.value.trim();
    const isValidDescription = description.length >= 20;
    
    if (!isValidDescription) {
      setValidationStyle(complaintDescription, false);
      complaintDescription.setCustomValidity('Please provide at least 20 characters');
    } else {
      setValidationStyle(complaintDescription, true);
      complaintDescription.setCustomValidity('');
    }
  } else {
    // If "Other" is not checked, no validation needed
    setValidationStyle(complaintDescription, true);
    complaintDescription.setCustomValidity('');
  }
});

// Solution radio buttons validation
const solutionRadios = document.querySelectorAll('input[name="solutions"]'); // Fixed name
solutionRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    const isOneSelected = Array.from(solutionRadios).some(r => r.checked);
    setValidationStyle(solutionGroup, isOneSelected);
    
    // Toggle "Other" solution description visibility and validation
    const otherSolution = document.getElementById('other-solution');
    if (otherSolution.checked) {
      // Trigger validation for solution description
      const event = new Event('change', { bubbles: true });
      solutionDescription.dispatchEvent(event);
    }
  });
});

// Solution description validation
solutionDescription.addEventListener('change', (e) => {
  const otherSolution = document.getElementById('other-solution');
  if (otherSolution && otherSolution.checked) {
    const description = e.target.value.trim();
    const isValidDescription = description.length >= 20;
    
    if (!isValidDescription) {
      setValidationStyle(solutionDescription, false);
      solutionDescription.setCustomValidity('Please provide at least 20 characters');
    } else {
      setValidationStyle(solutionDescription, true);
      solutionDescription.setCustomValidity('');
    }
  } else {
    // If "Other" is not checked, no validation needed
    setValidationStyle(solutionDescription, true);
    solutionDescription.setCustomValidity('');
  }
});

// Form submission
const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get and validate form data
  const formData = getFormData();
  const isFormValid = validateForm(formData);
  
  if (isFormValid) {
    // Form is valid, proceed with submission
    messageBox.textContent = "Form submitted successfully!";
    messageBox.style.color = "green";
    console.log('Form submitted successfully', formData);
    // Uncomment the line below to actually submit the form
    // form.submit();
  } else {
    // Form is invalid, validate all fields to show errors
    messageBox.textContent = "Please fix the highlighted errors.";
    messageBox.style.color = "red";
    validateAllFields();
  }
});

// Function to validate all fields at once
function validateAllFields() {
  const allInputs = document.querySelectorAll('input, textarea');
  allInputs.forEach(input => {
    const event = new Event('change', { bubbles: true });
    input.dispatchEvent(event);
  });
}

// Helper function to apply validation styles consistently
function setValidationStyle(element, isValid) {
  const color = isValid ? 'green' : 'red';
  element.style.borderColor = color;
  element.style.borderWidth = '2px';
  element.style.borderStyle = 'solid';
  element.style.borderRadius = '5px';
  
  if (!isValid) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/* function validateForm() {
  const form = document.querySelector('form'); // Select your form
  const inputs = form.querySelectorAll('input, textarea'); // Get all inputs
  
  const validationResults = {};
  let allValid = true;

  inputs.forEach(input => {
    // Check validation using Constraint API
    const isValid = !input.validity.patternMismatch && 
                   input.checkValidity();
    
    validationResults[input.name] = isValid;
    
    if (!isValid) allValid = false;
  });

  // Special cases for checkboxes and radios
  const isAnyComplaintChecked = document.querySelectorAll('input[name="complaint"]:checked').length > 0;
  const isAnySolutionSelected = document.querySelectorAll('input[name="solutions"]:checked').length > 0;
  
  validationResults['complaints-group'] = isAnyComplaintChecked;
  validationResults['solutions-group'] = isAnySolutionSelected;
  
  if (!isAnyComplaintChecked || !isAnySolutionSelected) {
    allValid = false;
  }

  return allValid ? validationResults : false;
} */