import { server } from './app'
import './websockets/client'

server.listen(3333, () => console.log('Server is running on port 33333...'))