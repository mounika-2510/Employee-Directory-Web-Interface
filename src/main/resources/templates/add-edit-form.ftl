<#include "layout.ftl">
<@layout title="Add Employee - Employee Directory" page="add-employee">
    <div class="form-container">
        <div class="form-header">
            <h1 id="formTitle">
                <i class="fas fa-user-plus"></i> Add New Employee
            </h1>
            <a href="/dashboard" class="btn btn-secondary">
                <i class="fas fa-arrow-left"></i> Back to Dashboard
            </a>
        </div>

        <form id="employeeForm" class="employee-form">
            <input type="hidden" id="employeeId" name="id">
            
            <div class="form-row">
                <div class="form-group">
                    <label for="firstName">First Name *</label>
                    <input type="text" id="firstName" name="firstName" required placeholder="Enter first name">
                    <div class="error-message" id="firstNameError"></div>
                </div>
                
                <div class="form-group">
                    <label for="lastName">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" required placeholder="Enter last name">
                    <div class="error-message" id="lastNameError"></div>
                </div>
            </div>
            
            <div class="form-group">
                <label for="email">Email Address *</label>
                <input type="email" id="email" name="email" required placeholder="Enter email address">
                <div class="error-message" id="emailError"></div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="department">Department *</label>
                    <select id="department" name="department" required>
                        <option value="">Select Department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                    </select>
                    <div class="error-message" id="departmentError"></div>
                </div>
                
                <div class="form-group">
                    <label for="role">Role *</label>
                    <select id="role" name="role" required>
                        <option value="">Select Role</option>
                        <option value="Manager">Manager</option>
                        <option value="Developer">Developer</option>
                        <option value="Analyst">Analyst</option>
                        <option value="Specialist">Specialist</option>
                        <option value="Coordinator">Coordinator</option>
                    </select>
                    <div class="error-message" id="roleError"></div>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="resetForm()">
                    <i class="fas fa-undo"></i> Reset Form
                </button>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save"></i> Save Employee
                </button>
            </div>
        </form>
    </div>

    <!-- Success Message -->
    <div id="successMessage" class="success-message">
        <i class="fas fa-check-circle"></i>
        <span id="successText">Operation completed successfully!</span>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            initializeForm();
        });
    </script>
</@layout>