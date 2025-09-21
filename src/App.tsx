import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Home from './components/pages/Home'
import './App.css'

const App = () => {
  return (
    <Router>
      <Toaster
        toastOptions={{
          error: {
            style: {
              background: '#ffcccc',
              color: '#fe0808',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
