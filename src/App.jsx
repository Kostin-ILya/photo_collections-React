import { useState, useEffect } from 'react'
import Collection from './Collection'

import './index.scss'

const App = () => {
  const [collections, setCollections] = useState([])
  const [categories, setCategories] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    fetch('https://63b2e9adea89e3e3db386dd3.mockapi.io/collections')
      .then((res) => res.json())
      .then((data) => setCollections(data))
      .catch((err) => {
        console.warn(err)
        // alert('Data loading error')
      })
  }, [])
  useEffect(() => {
    fetch('https://63b2e9adea89e3e3db386dd3.mockapi.io/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => {
        console.warn(err)
        // alert('Data loading error')
      })
  }, [])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj) => (
            <li key={obj.name}>{obj.name}</li>
          ))}
          {/* <li className="active">Все</li>
          <li>Горы</li>
          <li>Море</li>
          <li>Архитектура</li>
          <li>Города</li> */}
        </ul>
        <input
          className="search-input"
          placeholder="Поиск по названию"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
          }}
        />
      </div>
      <div className="content">
        {collections.map((col, i) => (
          <Collection key={i} name={col.name} photos={col.photos} />
        ))}
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  )
}

export default App
