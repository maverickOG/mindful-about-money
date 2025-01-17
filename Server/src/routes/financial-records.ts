import express from "express";
import { Request, Response, NextFunction } from "express";
import FinancialRecordModel from '../schema/financial-record'

const router = express.Router();

// Explicitly type the async route handlers
router.get('/getAllByUserID/:userId', async (req: Request, res: Response, next: NextFunction) => {
  // Get all records for a user
		try {
        const userId = req.params.userId // Get the user ID from the request
        const records = await FinancialRecordModel.find({ userId }) // Find all records with the user ID
        // If no records are found, return a 404 status code
				if (records.length === 0) {
            res.status(404).json({ message: 'No records found for the user.' })
            return
        }
        res.status(200).json(records)
    } catch (error) {
        console.error('Error getting records:', error)
        res.status(500).json({ message: 'Internal server error.' })
    }
})

// Similar explicit typing for other routes
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	// Create a new record
    try {
        const newRecord = new FinancialRecordModel(req.body) // Create a new record with the request body
        const savedRecord = await newRecord.save() // Save the new record
        res.status(201).json(savedRecord)
    } catch (error) {
        console.error('Error creating record:', error)
        res.status(500).json({ message: 'Internal server error.' })
    }
})

export default router