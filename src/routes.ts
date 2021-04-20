import { Router } from 'express'

import SettingsController from './controllers/SettingsController'

const routes = Router()


routes.post('/settings', async (request, response) => {
  return new SettingsController().create(request, response)
})

export default routes