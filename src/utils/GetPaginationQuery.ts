interface Props{
    limit:number
    cursor: string
    direction: string
    state: string
}


export const GET_PAGINATION_QUERY = ({limit, cursor, direction, state}:Props):any => {
    direction = direction ? direction : 'next'
    const query:any = {
        take: limit ? limit : 5,
        where: {}
        // orderBy: {
        //     createdAt: 'desc',
        // },
    }

    if(state){
        query.where["state"] = state
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

export const GET_NEXT_PREVIOUS_CURSOR = (elements:any[])=>{
    const nextCursor = elements.length > 0 ? elements[elements.length - 1].id.toString() : null;
    const previousCursor = elements.length > 0 ? elements[0].id.toString() : null;
    return {
        content: elements,
        nextCursor,
        previousCursor,
    }
}