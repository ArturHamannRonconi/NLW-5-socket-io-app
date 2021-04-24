import { server } from './app'
import './websockets/client'
import './websockets/admin'

server.listen(3333, () => console.log('Server is running on port 33333...'))