import { Router } from 'express'
import {
    deleteCustomer,
    getCustomerById,
    getCustomers,
    updateCustomer,
} from '../controllers/customers'
import auth from '../middlewares/auth'
import { doubleCsrfProtection } from '../middlewares/csrf'

const customerRouter = Router()

customerRouter.get('/', auth, getCustomers)
customerRouter.get('/:id', auth, getCustomerById)
customerRouter.patch('/:id', auth, doubleCsrfProtection, updateCustomer)
customerRouter.delete('/:id', auth, doubleCsrfProtection, deleteCustomer)

export default customerRouter
