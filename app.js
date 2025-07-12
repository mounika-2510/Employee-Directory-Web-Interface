let employees = [];
let filteredEmployees = [];
let currentPage = 1;
let pageSize = 10;
let deleteEmployeeId = null;
let isEditing = false;

document.addEventListener('DOMContentLoaded', function() {
    loadMockData();
    setupEventListeners();
    renderEmployees();
    showDashboard();
});

function loadMockData() {
    employees = [
        {
            id: 1,
            firstName: "John",
            lastName: "Doe", 
            email: "john.doe@company.com",
            department: "Engineering",
            role: "Manager"
        },
        {
            id: 2,
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@company.com", 
            department: "Marketing",
            role: "Specialist"
        },
        {
            id: 3,
            firstName: "Mike",
            lastName: "Johnson",
            email: "mike.johnson@company.com",
            department: "Engineering", 
            role: "Developer"
        },
        {
            id: 4,
            firstName: "Sarah",
            lastName: "Williams",
            email: "sarah.williams@company.com",
            department: "HR",
            role: "Manager"
        },
        {
            id: 5,
            firstName: "David",
            lastName: "Brown",
            email: "david.brown@company.com",
            department: "Sales",
            role: "Analyst"
        },
        {
            id: 6,
            firstName: "Emily",
            lastName: "Davis",
            email: "emily.davis@company.com",
            department: "Finance",
            role: "Coordinator"
        },
        {
            id: 7,
            firstName: "Chris",
            lastName: "Wilson",
            email: "chris.wilson@company.com",
            department: "Engineering",
            role: "Developer"
        },
        {
            id: 8,
            firstName: "Anna",
            lastName: "Taylor",
            email: "anna.taylor@company.com",
            department: "Marketing",
            role: "Manager"
        },
        {
            id: 9,
            firstName: "Robert",
            lastName: "Anderson",
            email: "robert.anderson@company.com",
            department: "Sales",
            role: "Specialist"
        },
        {
            id: 10,
            firstName: "Lisa",
            lastName: "Thomas",
            email: "lisa.thomas@company.com",
            department: "HR",
            role: "Coordinator"
        }
    ];
    
    filteredEmployees = [...employees];
}

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            searchEmployees(e.target.value);
        });
    }

    const departmentFilter = document.getElementById('departmentFilter');
    const roleFilter = document.getElementById('roleFilter');
    const sortBy = document.getElementById('sortBy');

    if (departmentFilter) {
        departmentFilter.addEventListener('change', applyFilters);
    }
    if (roleFilter) {
        roleFilter.addEventListener('change', applyFilters);
    }
    if (sortBy) {
        sortBy.addEventListener('change', applyFilters);
    }

    const employeeForm = document.getElementById('employeeForm');
    if (employeeForm) {
        employeeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit();
        });
    }

    const pageSize = document.getElementById('pageSize');
    if (pageSize) {
        pageSize.addEventListener('change', updatePageSize);
    }
}

function searchEmployees(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    
    if (term === '') {
        filteredEmployees = [...employees];
    } else {
        filteredEmployees = employees.filter(function(employee) {
            return employee.firstName.toLowerCase().includes(term) ||
                   employee.lastName.toLowerCase().includes(term) ||
                   employee.email.toLowerCase().includes(term);
        });
    }
    
    currentPage = 1;
    applyFilters();
}

function applyFilters() {
    let filtered = [...filteredEmployees];

    const departmentFilter = document.getElementById('departmentFilter');
    if (departmentFilter && departmentFilter.value !== '') {
        filtered = filtered.filter(function(emp) {
            return emp.department === departmentFilter.value;
        });
    }

    const roleFilter = document.getElementById('roleFilter');
    if (roleFilter && roleFilter.value !== '') {
        filtered = filtered.filter(function(emp) {
            return emp.role === roleFilter.value;
        });
    }

    const sortBy = document.getElementById('sortBy');
    if (sortBy) {
        const sortField = sortBy.value;
        filtered.sort(function(a, b) {
            if (a[sortField] < b[sortField]) return -1;
            if (a[sortField] > b[sortField]) return 1;
            return 0;
        });
    }

    filteredEmployees = filtered;
    currentPage = 1;
    renderEmployees();
}

function renderEmployees() {
    const employeeList = document.getElementById('employeeList');
    if (!employeeList) return;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

    if (paginatedEmployees.length === 0) {
        employeeList.innerHTML = '<div class="no-employees"><i class="fas fa-users" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i><br>No employees found matching your criteria.</div>';
        return;
    }

    let html = '';
    for (let i = 0; i < paginatedEmployees.length; i++) {
        const employee = paginatedEmployees[i];
        html += `
            <div class="employee-card" data-employee-id="${employee.id}">
                <div class="employee-info">
                    <div class="employee-name">${employee.firstName} ${employee.lastName}</div>
                    <div class="employee-email">${employee.email}</div>
                    <div class="employee-details">
                        <span class="department-badge">${employee.department}</span>
                        <span class="role-badge">${employee.role}</span>
                    </div>
                </div>
                <div class="employee-actions">
                    <button class="btn btn-edit" onclick="editEmployee(${employee.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-delete" onclick="deleteEmployee(${employee.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
    }

    employeeList.innerHTML = html;
    renderPagination();
}

function renderPagination() {
    const paginationControls = document.getElementById('paginationControls');
    if (!paginationControls) return;

    const totalPages = Math.ceil(filteredEmployees.length / pageSize);
    
    if (totalPages <= 1) {
        paginationControls.innerHTML = '';
        return;
    }

    let html = '';
    
    html += `<button class="pagination-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i> Previous
             </button>`;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            html += `<button class="pagination-btn active">${i}</button>`;
        } else {
            html += `<button class="pagination-btn" onclick="changePage(${i})">${i}</button>`;
        }
    }

    html += `<button class="pagination-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
                Next <i class="fas fa-chevron-right"></i>
             </button>`;

    paginationControls.innerHTML = html;
}

function changePage(page) {
    const totalPages = Math.ceil(filteredEmployees.length / pageSize);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderEmployees();
    }
}

function updatePageSize() {
    const pageSizeSelect = document.getElementById('pageSize');
    if (pageSizeSelect) {
        pageSize = parseInt(pageSizeSelect.value);
        currentPage = 1;
        renderEmployees();
    }
}

function showDashboard() {
    document.getElementById('dashboardPage').classList.add('active');
    document.getElementById('formPage').classList.remove('active');
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.classList.remove('active');
    });
    navLinks[0].classList.add('active');
    
    renderEmployees();
}

function showAddForm() {
    document.getElementById('dashboardPage').classList.remove('active');
    document.getElementById('formPage').classList.add('active');
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.classList.remove('active');
    });
    navLinks[1].classList.add('active');
    
    resetForm();
}

function editEmployee(id) {
    const employee = getEmployeeById(id);
    if (employee) {
        showAddForm();
        populateForm(employee);
        isEditing = true;
    }
}

function populateForm(employee) {
    document.getElementById('formTitle').innerHTML = '<i class="fas fa-edit"></i> Edit Employee';
    document.getElementById('employeeId').value = employee.id;
    document.getElementById('firstName').value = employee.firstName;
    document.getElementById('lastName').value = employee.lastName;
    document.getElementById('email').value = employee.email;
    document.getElementById('department').value = employee.department;
    document.getElementById('role').value = employee.role;
}

function deleteEmployee(id) {
    deleteEmployeeId = id;
    showDeleteModal();
}

function showDeleteModal() {
    const modal = document.getElementById('deleteModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function closeDeleteModal() {
    const modal = document.getElementById('deleteModal');
    if (modal) {
        modal.classList.remove('show');
    }
    deleteEmployeeId = null;
}

function confirmDelete() {
    if (deleteEmployeeId) {
        removeEmployee(deleteEmployeeId);
        closeDeleteModal();
        showSuccess('Employee deleted successfully!');
    }
}

function handleFormSubmit() {
    const formData = {
        id: document.getElementById('employeeId').value || null,
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        department: document.getElementById('department').value,
        role: document.getElementById('role').value
    };

    if (formData.id) {
        formData.id = parseInt(formData.id);
    }

    if (validateForm(formData)) {
        saveEmployee(formData);
        
        setTimeout(function() {
            showDashboard();
            resetForm();
        }, 1500);
    }
}

function validateForm(formData) {
    let isValid = true;
    clearErrors();

    if (!formData.firstName || formData.firstName.length < 2) {
        showError('firstName', 'First name must be at least 2 characters');
        isValid = false;
    }

    if (!formData.lastName || formData.lastName.length < 2) {
        showError('lastName', 'Last name must be at least 2 characters');
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    if (formData.email) {
        const existingEmployee = employees.find(function(emp) {
            return emp.email.toLowerCase() === formData.email.toLowerCase() && emp.id !== formData.id;
        });
        if (existingEmployee) {
            showError('email', 'This email address is already in use');
            isValid = false;
        }
    }

    if (!formData.department) {
        showError('department', 'Please select a department');
        isValid = false;
    }

    if (!formData.role) {
        showError('role', 'Please select a role');
        isValid = false;
    }

    return isValid;
}

function showError(fieldName, message) {
    const errorElement = document.getElementById(fieldName + 'Error');
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = message;
    }
    if (inputElement) {
        inputElement.classList.add('error');
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputElements = document.querySelectorAll('.error');
    
    errorElements.forEach(function(el) {
        el.textContent = '';
    });
    
    inputElements.forEach(function(el) {
        el.classList.remove('error');
    });
}

function resetForm() {
    const form = document.getElementById('employeeForm');
    if (form) {
        form.reset();
    }
    document.getElementById('employeeId').value = '';
    document.getElementById('formTitle').innerHTML = '<i class="fas fa-user-plus"></i> Add New Employee';
    clearErrors();
    isEditing = false;
}

function saveEmployee(employeeData) {
    if (employeeData.id) {
        const index = employees.findIndex(function(emp) {
            return emp.id === employeeData.id;
        });
        if (index !== -1) {
            employees[index] = employeeData;
            showSuccess('Employee updated successfully!');
        }
    } else {
        employeeData.id = generateNewId();
        employees.push(employeeData);
        showSuccess('Employee added successfully!');
    }
    
    filteredEmployees = [...employees];
    applyFilters();
}

function removeEmployee(id) {
    employees = employees.filter(function(emp) {
        return emp.id !== id;
    });
    filteredEmployees = [...employees];
    applyFilters();
}

function getEmployeeById(id) {
    return employees.find(function(emp) {
        return emp.id === id;
    });
}

function generateNewId() {
    let maxId = 0;
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].id > maxId) {
            maxId = employees[i].id;
        }
    }
    return maxId + 1;
}

function showSuccess(message) {
    const successMessage = document.getElementById('successMessage');
    const successText = document.getElementById('successText');
    
    if (successMessage && successText) {
        successText.textContent = message;
        successMessage.classList.add('show');
        
        setTimeout(function() {
            successMessage.classList.remove('show');
        }, 3000);
    }
}

function initializeDashboard() {
    if (window.mockEmployees) {
        employees = [...window.mockEmployees];
        filteredEmployees = [...employees];
    }
    setupEventListeners();
    renderEmployees();
}

function initializeForm() {
    setupEventListeners();
}

window.onclick = function(event) {
    const modal = document.getElementById('deleteModal');
    if (event.target === modal) {
        closeDeleteModal();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeDeleteModal();
    }
});