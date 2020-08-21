import { uniqBy } from "lodash"
import { User } from "./types"

type SearchResult = User

type SearchResults = SearchResult[]

type SearchResultProvider = (searchTerm: string, data: any[]) => SearchResults

class SearchRecSys {
    
  private providers: SearchResultProvider[] = []
  
  query: SearchResultProvider = (searchTerm, data) => {
    const results = this.providers.reduce(
      (searchResults: SearchResults, item) => {
        return searchResults.concat(item(searchTerm, data))
      },[]
    )

    return uniqBy(results, 'id')
  }
  
  loadProviders = (
    providers: SearchResultProvider | SearchResultProvider[]
  ): void => {
    this.providers = this.providers.concat(providers)
  }
}

const searchRecommendation = new SearchRecSys()

const searchUsingKey = (key: string): SearchResultProvider =>
  (searchTerm: string, data: any[]): SearchResults => {
    const results = data.filter(
      item => item[key].toLowerCase().includes(searchTerm.toLowerCase())
    )
    return results
  }

searchRecommendation.loadProviders(searchUsingKey("name"))
searchRecommendation.loadProviders(searchUsingKey("username"))

export default searchRecommendation