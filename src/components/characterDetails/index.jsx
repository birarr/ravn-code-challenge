import { useCallback, useEffect } from 'react'
import { useQuery, useQueries } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { BiLeftArrowAlt } from 'react-icons/bi'

import './styles.css'

const CharacterDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const vehiclesU = [
    'https://swapi.dev/api/vehicles/14/',
    'https://swapi.dev/api/vehicles/30/',
  ]
  const fetchCharacter = async () => {
    const response = await fetch(`https://swapi.dev/api/people/${id}`)
    return response.json()
  }
  const { data: characterData, status: characterStatus } = useQuery(
    'character',
    fetchCharacter
  )
  const vehiclesURL = characterData?.vehicles ? characterData?.vehicles : []

  const queryResults = useQueries(
    vehiclesURL?.map((vehicle) => {
      return {
        queryKey: ['vehicle', vehicle],
        queryFn: () => fetchVehicle(vehicle),
        enabled: !!vehicle,
      }
    }) ?? []
  )

  const fetchVehicle = async (vehicle) => {
    const response = await fetch(vehicle)
    return response.json()
  }

  function capitalizeFirstLetter(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1)
  }

  const handleBackPage = () => {
    navigate('/')
  }

  return (
    <div className="container">
      <header className="header">
        <BiLeftArrowAlt className="icon" onClick={handleBackPage} />
        <h1 className="characterTitle">{characterData?.name}</h1>
      </header>
      <div className="characterContainer">
        <h2>General Information</h2>
        <div className="characterDetails">
          <p>Eye color</p>
          <strong>{capitalizeFirstLetter(characterData?.eye_color)}</strong>
        </div>
        <div className="characterDetails">
          <p>Hair Color</p>
          <strong>{capitalizeFirstLetter(characterData?.hair_color)}</strong>
        </div>
        <div className="characterDetails">
          <p>Skin Color</p>
          <strong>{capitalizeFirstLetter(characterData?.skin_color)}</strong>
        </div>
        <div className="characterDetails">
          <p>Birth Year</p>
          <strong>{capitalizeFirstLetter(characterData?.birth_year)}</strong>
        </div>
      </div>
      <div className="vehiclesContainer">
        <h2>Vehicles</h2>
        {queryResults?.map((vehicle, index) => (
          <p key={index}>{vehicle?.data?.name}</p>
        ))}
      </div>
    </div>
  )
}

export default CharacterDetails
