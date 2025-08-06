const customersController = require("../controllers/customers.controller");
const { authenticateToken, authorizeRole } = require("../middleware/auth.middleware");

module.exports = app => {
    // Protected routes (authentication required)
    app.post('/api/getcustomers', authenticateToken, authorizeRole(['Customer Admin', 'Super Admin']), customersController.getAllCustomers);
    app.get('/api/customers/:id', authenticateToken, authorizeRole(['Customer Admin', 'Super Admin']), customersController.getCustomerById);
    app.get('/api/customers/email/:email', authenticateToken, authorizeRole(['Customer Admin', 'Super Admin']), customersController.getCustomerByEmail);
    app.get('/api/customers/admin-type/:adminTypeId', authenticateToken, authorizeRole(['Customer Admin', 'Super Admin']), customersController.getCustomersByAdminType);
    
    // Admin-only routes
    app.post('/api/customers', authenticateToken, authorizeRole(['Customer Admin', 'Super Admin']), customersController.createCustomer);
    app.put('/api/customers/:id', authenticateToken, authorizeRole(['Customer Admin', 'Super Admin']), customersController.updateCustomer);
    app.delete('/api/customers/:id', authenticateToken, authorizeRole(['Customer Admin', 'Super Admin']), customersController.deleteCustomer);
}; 