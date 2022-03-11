import React from 'react'
import { useQuery } from 'react-query'
import rightArrow from '../../assets/rightArrow.png'

import './styles.css'

const Person = ({ person }) => {
  const homeworldUrlParts = person?.homeworld.split('/').filter(Boolean)
  const homeworldId = homeworldUrlParts[homeworldUrlParts.length - 1]

  const fetchPlanet = async () => {
    const response = await fetch(
      `https://swapi.dev/api/planets/${homeworldId}/`
    )
    return response.json()
  }

  const { data: planetData, status: planetStatus } = useQuery(
    `homeworld-${homeworldId}`,
    fetchPlanet
  )

  return (
    <div className="card">
      <div className="personWrapper">
        <div>
          <h3 className="personName">{person.name}</h3>
        </div>
        <p className="personGender">
          {person?.gender === 'n/a' ? 'Droid' : 'Male'} from{' '}
          {planetStatus === 'error' ? <p>---</p> : planetData?.name}
        </p>
      </div>
      <img src={rightArrow} alt="right arrow" className="rightArrow" />
    </div>
  )
}

export default Person
