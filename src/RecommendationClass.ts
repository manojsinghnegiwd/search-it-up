interface SearchResult {
  term: string
  type: string
}

type SearchResults = SearchResult[]

type SearchResultProvider = (searchTerm: string) => SearchResults

class SearchRecSys {
    
  private providers: SearchResultProvider[] = []
  
  query: SearchResultProvider = (searchTerm) => {
    const results = this.providers.reduce(
      (searchResults: SearchResults, item) => {
        return searchResults.concat(item(searchTerm))
      },[]
    )
    return results
  }
  
  loadProviders = (
    providers: SearchResultProvider | SearchResultProvider[]
  ): void => {
    this.providers = this.providers.concat(providers)
  }
}

const search = new SearchRecSys()

const searchUsingTerm: SearchResultProvider = (searchTerm) => {
  const data = [
    {
      "term": "business",
      "type": "term"
    },
    {
      "term": "business tips",
      "type": "term"
    },
    {
      "term": "social media",
      "type": "term"
    },
    {
      "term": "social media marketing",
      "type": "term"
    }
  ]
  
  const results = data.filter(
    item => item.term.includes(searchTerm)
  )

  return results
}
  
  // const searchUsingType: SearchResultProvider = (searchTerm) => {
  //   const data = [
  //     {
  //       "term": "facebook",
  //       "type": "social"
  //     },
  //     {
  //       "term": "twitter",
  //       "type": "social"
  //     },
  //     {
  //       "term": "Warren buffet",
  //       "type": "business"
  //     }
  //   ]
    
  //   const results = data.filter(
  //     item => item.type.includes(searchTerm)
  //   )
    
  //   return results
  // }
  
  // search.loadProviders(searchUsingTerm)
  
  // search.loadProviders(searchUsingType)
  
  // search.query("business")

export default SearchRecSys