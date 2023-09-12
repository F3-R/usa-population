export interface Population {
    "ID Nation": string,
    "Nation": string,
    "ID Year": number,
    "Year": string,
    "Population": number,
    "Slug Nation": string
}

export interface FetchedPopulation {
    data: {
        "ID Nation": string,
        "Nation": string,
        "ID Year": number,
        "Year": string,
        "Population": number,
        "Slug Nation": string
    }[],
    source: []
}

