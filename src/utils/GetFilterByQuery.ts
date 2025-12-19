interface Props {
    limit           : number
    cursor          : string
    direction       : string
    orderBy         : string
    subCategoryId   : string
    tags            : string[]
}

export const GET_FILTER_PAGINATION_QUERY = ({
    limit, 
    cursor, 
    direction,
    orderBy,
    subCategoryId,
    tags
}:Props):any => {
    direction = direction ? direction : 'next'

    const tagConditions = tags.map(tagName => ({
        tags: {
            some: {
                tag: {
                    displayName: {
                        in: [tagName.toLowerCase()]
                    }
                }
            }
        }
    }))
    
    let query:any = {
        take: limit ? limit : 5,
        where: {},
        orderBy: {
            creationDate: orderBy,
        },
    }

    if(tags.length && tags[0].trim()){
        // !Object.keys(query?.where).length && (query['where'] = {})
        query.where['AND'] = tagConditions
    }
    if(subCategoryId){
        // !Object.keys(query?.where).length && (query['where'] = {})
        query.where['subCategoryId'] = subCategoryId
    }

    if (cursor) {
        if (direction === 'next') {
            cursor && (query['cursor'] = { id: cursor })
            query['skip'] = 1 
        } else if (direction === 'previous') {
            cursor && (query['cursor'] = { id: cursor })
            query['take'] = -limit
            query['skip'] = 1 
        }
    }



    return query
}