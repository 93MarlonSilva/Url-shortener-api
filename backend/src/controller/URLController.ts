import { Request, Response } from 'express'
import shortId from 'shortid'
import { config } from '../config/Constants'
import { URLModel } from '../database/model/URL'

export class URLController {
	public async shorten(req: Request, response: Response): Promise<void> { // Função para receber a url e gerar o hash
		const { originURL } = req.body
		const url = await URLModel.findOne({ originURL })
		if (url) {   // Verifica se foi enviado a url
			response.json(url)
			return
		}
		const hash = shortId.generate()   // Se foi passado gera o hash
		const shortURL = `${config.API_URL}/${hash}`
		const newURL = await URLModel.create({ hash, shortURL, originURL })
		response.json(newURL)
	}

	public async redirect(req: Request, response: Response): Promise<void> { // Função de seleção do hash
		const { hash } = req.params
		const url = await URLModel.findOne({ hash })

		if (url) {
			response.redirect(url.originURL)
			return
		}

		response.status(400).json({ error: 'URL not found' })
	}
}
