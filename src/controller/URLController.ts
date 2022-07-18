import { Request, Response } from 'express'
import shortId from 'shortid'
import { config } from '../config/Constants'
import { URLModel } from '../database/model/URL'

export class URLController {
	public async shorten(req: Request, response: Response): Promise<void> {
		const { originURL } = req.body
		const url = await URLModel.findOne({ originURL })
		if (url) {
			response.json(url)
			return
		}
		const hash = shortId.generate()
		const shortURL = `${config.API_URL}/${hash}`
		const newURL = await URLModel.create({ hash, shortURL, originURL })
		try {
			response.json(newURL)
			
		} catch (error) {
			console.log(error)
			response.status(404).json({ message: 'Error to generate URL'})
		}
		
	}

	public async redirect(req: Request, response: Response): Promise<void> {
		const { hash } = req.params
		const url = await URLModel.findOne({ hash })
        
		try {
			if (url) {
				response.json(url.originURL)
			}
		} catch (error) {
			console.log(error) 
			response.status(404).json({ message: 'URL not found' }) 
			
		}
		
	}

	public async list(req: Request, response: Response): Promise<void> {
		const { listURL } = req.params
		const url = await URLModel.find({ listURL })
        
		try {
			if (url) {
				response.json(listURL)
			}
		} catch (error) {
			console.log(error) 
			response.status(404).json({ message: 'List not found' })

        } 
	}
}