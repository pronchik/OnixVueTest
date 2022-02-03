import axios from 'axios'

const tasks = axios.create({
  baseURL: 'https://little-river-8026.getsandbox.com:443/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default tasks
