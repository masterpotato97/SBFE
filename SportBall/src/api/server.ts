const token = 'dfa1e699135555a17f14fe002ae4bb7aed835519fa412048'

export const server_calls = {
    get: async () => { 
        const response = await fetch(`https://sbbe.onrender.com/api/playerinfos`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'x-access-token': `Bearer ${token}`
            }

        });

        if (!response.ok){
            throw new Error('Failed to fetch data from the server')
        }

        return await response.json()
    },
    create: async (data: any = {}) => {
        const response = await fetch(`https://sbbe.onrender.com/api/playerinfo`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)

        })

        if (!response.ok) {
            throw new Error('Failed to create new data on the server')
        }

        return await response.json()
    },

    update: async (id: string, data:any = {}) => {
        console.log(id)
        console.log(data)
        const response = await fetch(`https://sbbe.onrender.com/api/playerinfos/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)

        })

        if (!response.ok) {
            throw new Error('Failed to update data on the server')
        }

        return await response.json()
    },
    delete: async (id: string) => {
        const response = await fetch(`https://sbbe.onrender.com/api/playerinfos/${id}`,
         {
           method: 'DELETE',
           headers: {
              'Content-Type': 'application/json',
              'x-access-token': `Bearer ${token}`
           },
        });
  
        if (!response.ok) {
           throw new Error('Failed to delete data from the server');
        }
  
        return;
     },
     headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
    }
    
    

}