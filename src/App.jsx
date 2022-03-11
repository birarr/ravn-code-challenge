import People from './components/people'
import CharacterDetails from './components/characterDetails'
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<People />} />
      <Route path="/characterdetails/:id" element={<CharacterDetails />} />
    </Routes>
  )
}

export default App
