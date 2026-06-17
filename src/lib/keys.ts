/** Chaves de persistência centralizadas. */
export const STORAGE_KEYS = {
  sessions: 'sessions',
  vocabularyProgress: 'vocabulary:progress',
  verbsProgress: 'verbs:progress',
  verbsFormStats: 'verbs:form-stats',
  interests: 'video:interests',
  dailyVideo: 'video:daily',
  showTranslation: 'pref:show-translation',
  dailyWriting: 'writing:daily',
  writingSrs: 'writing:srs',
  commonWordsKnown: 'words:known',
  framesWriting: 'frames:writing',
} as const
