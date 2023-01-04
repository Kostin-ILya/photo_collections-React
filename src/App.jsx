import { useState, useEffect } from 'react'
import Collection from './Collection'

import './index.scss'

const pagesArr = [1, 2, 3, 4]

const App = () => {
  const [collections, setCollections] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState(0)
  const [page, setPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const category = activeCategory ? `&category=${activeCategory}` : ''
    fetch(
      `https://63b2e9adea89e3e3db386dd3.mockapi.io/collections?page=${page}&limit=3&${category}`
    )
      .then((res) => res.json())
      .then(setCollections)
      .catch((err) => {
        console.warn(err)
        // alert('Data loading error')
      })
  }, [activeCategory, page])
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
          {categories.map((obj, index) => (
            <li
              key={obj.name}
              className={index === activeCategory ? 'active' : null}
              onClick={() => {
                setActiveCategory(index)
              }}
            >
              {obj.name}
            </li>
          ))}
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
        {collections
          .filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((col, i) => (
            <Collection key={i} name={col.name} photos={col.photos} />
          ))}
      </div>
      <ul className="pagination">
        {pagesArr.map((item) => (
          <li
            key={item}
            className={item === page ? 'active' : null}
            onClick={() => {
              setPage(item)
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
