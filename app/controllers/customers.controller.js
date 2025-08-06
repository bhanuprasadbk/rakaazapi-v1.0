const customersModel = require('../models/customers.model');
const logger = require('../logger/logger');
const errorlog = require('../logger/logger').errorlog;
const successlog = require('../logger/logger').successlog;

module.exports = {
    // Get all customers
    getAllCustomers: async (req, res) => {
        try {
            customersModel.getAllCustomers(req.body, (error, results) => {
                if (error) {
                    errorlog.error('Error fetching customers:', error);
                    return res.status(500).json({
                        success: false,
                        message: 'Error fetching customers',
                        error: error.message
                    });
                }
                successlog.info('Customers fetched successfully');
                return res.status(200).json({
                    success: true,
                    message: 'Customers fetched successfully',
                    results
                });
            });
        } catch (error) {
            errorlog.error('Exception in getAllCustomers:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },

    // Get customer by ID
    getCustomerById: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Customer ID is required'
                });
            }

            customersModel.getCustomerById(id, (error, result) => {
                if (error) {
                    errorlog.error('Error fetching customer by ID:', error);
                    return res.status(500).json({
                        success: false,
                        message: 'Error fetching customer',
                        error: error.message
                    });
                }

                if (!result) {
                    return res.status(404).json({
                        success: false,
                        message: 'Customer not found'
                    });
                }

                successlog.info(`Customer fetched with ID: ${id}`);
                return res.status(200).json({
                    success: true,
                    message: 'Customer fetched successfully',
                    data: result
                });
            });
        } catch (error) {
            errorlog.error('Exception in getCustomerById:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },

    // Get customer by email
    getCustomerByEmail: async (req, res) => {
        try {
            const { email } = req.params;

            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: 'Customer email is required'
                });
            }

            customersModel.getCustomerByEmail(email, (error, result) => {
                if (error) {
                    errorlog.error('Error fetching customer by email:', error);
                    return res.status(500).json({
                        success: false,
                        message: 'Error fetching customer',
                        error: error.message
                    });
                }

                if (!result) {
                    return res.status(404).json({
                        success: false,
                        message: 'Customer not found'
                    });
                }

                successlog.info(`Customer fetched with email: ${email}`);
                return res.status(200).json({
                    success: true,
                    message: 'Customer fetched successfully',
                    data: result
                });
            });
        } catch (error) {
            errorlog.error('Exception in getCustomerByEmail:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },

    // Create new customer
    createCustomer: async (req, res) => {
        try {
            const {
                organization_name, contact_person_name, customer_admin_name, username,
                email, contact_number, contact_object, customer_admin_type, roleid, currency,
                password, address, country_id, state_id, city_id, created_by
            } = req.body;

            if (!organization_name || !customer_admin_name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Organization name, customer admin name, email, and password are required'
                });
            }

            const customerData = {
                organization_name,
                contact_person_name,
                customer_admin_name,
                username,
                email,
                contact_number,
                contact_object,
                customer_admin_type,
                roleid,
                currency,
                password,
                address,
                country_id,
                state_id,
                city_id,
                created_by
            };

            customersModel.createCustomer(customerData, (error, insertId) => {
                if (error) {
                    errorlog.error('Error creating customer admin:', error);
                    return res.status(500).json({
                        success: false,
                        message: 'Error creating customer admin',
                        error: error.message
                    });
                }
                successlog.info(`Customer Admin created with ID: ${insertId}`);


                return res.status(201).json({
                    success: true,
                    message: 'Customer Admin created successfully',
                    data: insertId
                });
            });
        } catch (error) {
            errorlog.error('Exception in createCustomer:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },

    // Update customer
    updateCustomer: async (req, res) => {
        try {
            const {
                customer_id, // required for update
                organization_name, contact_person_name, customer_admin_name, username,
                email, contact_number, contact_object, customer_admin_type, roleid, currency,
                address, country_id, state_id, city_id, updated_by
            } = req.body;

            if (!customer_id || !organization_name || !customer_admin_name || !email) {
                return res.status(400).json({
                    success: false,
                    message: 'Customer ID, organization name, customer admin name, and email are required'
                });
            }

            const customerData = {
                organization_name,
                contact_person_name,
                customer_admin_name,
                username,
                email,
                contact_number,
                contact_object,
                customer_admin_type,
                roleid,
                currency,
               // password,
                address,
                country_id,
                state_id,
                city_id,
                updated_by
            };

            customersModel.updateCustomer(customer_id, customerData, (error, result) => {
                if (error) {
                    errorlog.error('Error updating customer admin:', error);
                    return res.status(500).json({
                        success: false,
                        message: 'Error updating customer admin',
                        error: error.message
                    });
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json({
                        success: false,
                        message: 'Customer Admin not found'
                    });
                }

                successlog.info(`Customer Admin updated with ID: ${customer_id}`);
                return res.status(200).json({
                    success: true,
                    message: 'Customer Admin updated successfully'
                });
            });

        } catch (error) {
            errorlog.error('Exception in updateCustomer:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    }
    ,

    // Delete customer
    deleteCustomer: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Customer ID is required'
                });
            }

            customersModel.deleteCustomer(id, (error, deleted) => {
                if (error) {
                    errorlog.error('Error deleting customer:', error);
                    return res.status(500).json({
                        success: false,
                        message: 'Error deleting customer',
                        error: error.message
                    });
                }

                if (!deleted) {
                    return res.status(404).json({
                        success: false,
                        message: 'Customer not found'
                    });
                }

                successlog.info(`Customer deleted with ID: ${id}`);
                return res.status(200).json({
                    success: true,
                    message: 'Customer deleted successfully'
                });
            });
        } catch (error) {
            errorlog.error('Exception in deleteCustomer:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },

    // Get customers by admin type
    getCustomersByAdminType: async (req, res) => {
        try {
            const { adminTypeId } = req.params;

            if (!adminTypeId) {
                return res.status(400).json({
                    success: false,
                    message: 'Admin type ID is required'
                });
            }

            customersModel.getCustomersByAdminType(adminTypeId, (error, results) => {
                if (error) {
                    errorlog.error('Error fetching customers by admin type:', error);
                    return res.status(500).json({
                        success: false,
                        message: 'Error fetching customers by admin type',
                        error: error.message
                    });
                }
                successlog.info(`Customers fetched for admin type: ${adminTypeId}`);
                return res.status(200).json({
                    success: true,
                    message: 'Customers fetched successfully',
                    data: results
                });
            });
        } catch (error) {
            errorlog.error('Exception in getCustomersByAdminType:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    }
}; 