<#include "layout.ftl">
<@layout title="Dashboard - Employee Directory" page="dashboard">
    <div class="dashboard-container">
        <div class="dashboard-header">
            <h1><i class="fas fa-users"></i> Employee Directory</h1>
            <a href="/add-employee" class="btn btn-primary">
                <i class="fas fa-plus"></i> Add New Employee
            </a>
        </div>

        <!-- Search and Filter Controls -->
        <div class="controls-section">
            <div class="search-container">
                <i class="fas fa-search search-icon"></i>
                <input type="text" id="searchInput" placeholder="Search employees by name or email..." class="search-input">
            </div>
            
            <div class="filter-container">
                <select id="departmentFilter" class="filter-select">
                    <option value="">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                </select>
                
                <select id="roleFilter" class="filter-select">
                    <option value="">All Roles</option>
                    <option value="Manager">Manager</option>
                    <option value="Developer">Developer</option>
                    <option value="Analyst">Analyst</option>
                    <option value="Specialist">Specialist</option>
                    <option value="Coordinator">Coordinator</option>
                </select>
                
                <select id="sortBy" class="filter-select">
                    <option value="firstName">Sort by First Name</option>
                    <option value="department">Sort by Department</option>
                </select>
            </div>
        </div>

        <!-- Employee List/Grid -->
        <div class="employee-list" id="employeeList">
            <#-- Mock data for Freemarker template -->
            <#assign employees = [
                {"id": 1, "firstName": "John", "lastName": "Doe", "email": "john.doe@company.com", "department": "Engineering", "role": "Manager"},
                {"id": 2, "firstName": "Jane", "lastName": "Smith", "email": "jane.smith@company.com", "department": "Marketing", "role": "Specialist"},
                {"id": 3, "firstName": "Mike", "lastName": "Johnson", "email": "mike.johnson@company.com", "department": "Engineering", "role": "Developer"},
                {"id": 4, "firstName": "Sarah", "lastName": "Williams", "email": "sarah.williams@company.com", "department": "HR", "role": "Manager"},
                {"id": 5, "firstName": "David", "lastName": "Brown", "email": "david.brown@company.com", "department": "Sales", "role": "Analyst"},
                {"id": 6, "firstName": "Emily", "lastName": "Davis", "email": "emily.davis@company.com", "department": "Finance", "role": "Coordinator"},
                {"id": 7, "firstName": "Chris", "lastName": "Wilson", "email": "chris.wilson@company.com", "department": "Engineering", "role": "Developer"},
                {"id": 8, "firstName": "Anna", "lastName": "Taylor", "email": "anna.taylor@company.com", "department": "Marketing", "role": "Manager"},
                {"id": 9, "firstName": "Robert", "lastName": "Anderson", "email": "robert.anderson@company.com", "department": "Sales", "role": "Specialist"},
                {"id": 10, "firstName": "Lisa", "lastName": "Thomas", "email": "lisa.thomas@company.com", "department": "HR", "role": "Coordinator"}
            ]>
            
            <#list employees as employee>
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
            </#list>
        </div>

        <!-- Pagination Controls -->
        <div class="pagination-container">
            <div class="pagination-info">
                <span>Show 
                    <select id="pageSize" onchange="updatePageSize()">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    entries per page
                </span>
            </div>
            <div class="pagination-controls" id="paginationControls">
                <!-- Pagination buttons will be generated by JavaScript -->
            </div>
        </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div id="deleteModal" class="modal">
        <div class="modal-content">
            <h3><i class="fas fa-exclamation-triangle" style="color: #dc3545;"></i> Delete Employee</h3>
            <p>Are you sure you want to delete this employee? This action cannot be undone.</p>
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="closeDeleteModal()">
                    <i class="fas fa-times"></i> Cancel
                </button>
                <button class="btn btn-danger" onclick="confirmDelete()">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    </div>

    <!-- Success Message -->
    <div id="successMessage" class="success-message">
        <i class="fas fa-check-circle"></i>
        <span id="successText">Operation completed successfully!</span>
    </div>

    <script>
        // Initialize mock data in JavaScript for dynamic functionality
        window.mockEmployees = ${employees?json_string};
        
        // Initialize the dashboard when page loads
        document.addEventListener('DOMContentLoaded', function() {
            initializeDashboard();
        });
    </script>
</@layout>