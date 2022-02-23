export interface ShowContentInterface {
  title: string
  key?: string
  type?: string
  content: any
}

export interface HistoryTableShow {
  tabId: number
  pageTitle: string
  linkUrl: string
  desc?: string
  keywords?: string
  icons?: Array<string>
  imgs?: Array<string>
}
