import { useEffect, useState } from 'react'
import './App.css'
import styles from './App.module.scss'
import { Definition } from './defintion/Definition'
import type { Word } from './defintion/Definition'
import axios from 'axios'
import SearchOutlined from '@ant-design/icons/lib/icons/SearchOutlined'
import CloseOutlined from '@ant-design/icons/lib/icons/CloseOutlined'

export function App() {
  const [searchItem, setSearchItem] = useState('')
  const [word, setWord] = useState({} as Word)

  const replaceWord = (val: string) => {
    setSearchItem(val)
  }

  const searchWord = async () => {
    if (!searchItem) {
      return
    }

    try {
      const response = await axios.get<Array<Word>>(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchItem}`
      )

      if (response) {
        setWord(response.data[0])
      }
    } catch (err) {
      setWord({} as Word)
    }
  }

  useEffect(() => {
    const getData = setTimeout(async () => {
      if (searchItem) {
        searchWord()
      }
    }, 1000)

    return () => clearTimeout(getData)
  }, [searchItem])

  return (
    <>
      <div className={styles['search-container']}>
        <div className={styles['search-box']}>
          <input
            className={styles['search-input']}
            value={searchItem}
            onChange={(e) => {
              setSearchItem((e.target as HTMLInputElement).value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchWord()
              }
            }}
          />
          <div>
            <button
              className={styles['search-container-btn']}
              role="button"
              onClick={(e) => {
                e.stopPropagation()
                setSearchItem('')
                setWord({} as Word)
              }}
            >
              <CloseOutlined style={{ fontSize: '12px' }} />
            </button>
          </div>
          <div>
            <button
              className={styles['search-container-btn']}
              role="button"
              onClick={(e) => {
                e.stopPropagation()
                searchWord()
              }}
            >
              <SearchOutlined style={{ fontSize: '12px' }} />
            </button>
          </div>
        </div>
        <div className={styles['result-container']}>
          <div className={styles['result-cover']}></div>
          <div className={styles.result}></div>
        </div>
      </div>
      {word.word ? (
        <Definition word={word} onChange={replaceWord} />
      ) : searchItem ? (
        <div>No word found</div>
      ) : (
        <div>Type something to search</div>
      )}
    </>
  )
}
