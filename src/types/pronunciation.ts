export interface WordScore {
  word: string
  accuracyScore: number
  errorType?: string
}

export interface PronunciationResult {
  accuracyScore: number
  fluencyScore: number
  completenessScore: number
  pronunciationScore: number
  prosodyScore?: number
  words: WordScore[]
  recognizedText?: string
}
