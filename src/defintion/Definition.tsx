import SoundOutlined from '@ant-design/icons/lib/icons/SoundOutlined'
import styles from './definition.module.scss'

export type WordMeaningProps = {
  word: Word
  onChange: (val: string) => void
}

export type Word = {
  word: string
  phonetic: string
  phonetics: Array<Phonetic>
  meanings: Array<Meaning>
}

export type Phonetic = {
  text: string
  audio?: string
}

export type Meaning = {
  partOfSpeech: string
  definitions: Array<Definition>
  synonyms: Array<string>
}

export interface MeaningProps extends Meaning {
  onChange: (val: string) => void
}

type Definition = {
  definition: string
  example?: string
}

export function Definition({ word, onChange }: WordMeaningProps) {
  const playMusic = (url?: string) => {
    if (!url) {
      return
    }

    var audio = new Audio(url)
    audio.play()
  }

  return (
    <>
      <div className={styles['word-container']}>
        <div className={styles['phonetic-container']}>
          <span className={styles.word}>{word.word}</span>
          {word.phonetics[0].audio ? (
            <button
              className={styles['phonetic-audio-btn']}
              onClick={(e) => {
                e.stopPropagation()
                playMusic(word.phonetics[0].audio)
              }}
            >
              <SoundOutlined />
            </button>
          ) : null}
        </div>
        <span className={styles.phonetic}>{word.phonetic}</span>
      </div>
      {word.meanings.map((meaning, index) => (
        <DefinitionBox
          key={index}
          partOfSpeech={meaning.partOfSpeech}
          definitions={meaning.definitions}
          synonyms={meaning.synonyms}
          onChange={onChange}
        />
      ))}
    </>
  )
}

function DefinitionBox({
  partOfSpeech,
  definitions,
  synonyms,
  onChange,
}: MeaningProps) {
  return (
    <div className={styles['definition-container']}>
      <span className={styles['speech-type']}>{partOfSpeech}</span>
      <ol>
        {definitions.map((definition, index) => (
          <li key={index}>
            <div>
              <div>{definition.definition}</div>
              {definition.example ? (
                <div
                  className={styles.example}
                >{`"${definition.example}"`}</div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
      {synonyms.length > 0 ? (
        <div className={styles['synonyms']}>
          <span>Similar: </span>
          <div className={styles['synonyms-container']}>
            {synonyms.map((synoynm) => (
              <div
                key={synoynm}
                className={styles['synonym-container']}
                role="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onChange(synoynm)
                }}
              >
                <div className={styles['synoynm-badge']}>
                  <span>{synoynm}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
