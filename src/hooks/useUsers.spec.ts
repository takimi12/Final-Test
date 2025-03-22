import { renderHook } from "@testing-library/react"
import { useUsers } from "./useUsers"
import { SingleUser } from "../types"
import * as apiHook from "./useApi"
import { act } from "react"

describe('useUsers', () => {
    it('verify that initial users and adults are empty', () => {
   const {result} =  renderHook(() => useUsers())
        
   expect(result.current.adults).toHaveLength(0)
   expect(result.current.users).toHaveLength(0)
    })
    it('shpild get users from the API', async () => {
        const returnedUsers:SingleUser[]= [
            {id:'1', name:'aaa5', age:10},
            {id:'2', name:'aaa4', age:20},
            {id:'3', name:'aaa3', age:11},
            {id:'4', name:'aaa2', age:30},
            {id:'5', name:'aaa1', age:20}

 ]
 vi.spyOn(apiHook, 'useApi').mockReturnValueOnce({
    get: async <R>() => new Promise<R>(resolve => resolve(returnedUsers as R))
  });
  

   const {result} =  renderHook(() => useUsers())

   await act( async () =>{
    await result.current.getUsers()
   });     

   expect(result.current.adults).toHaveLength(2)
   expect(result.current.adults).toEqual([{id:'5', name:'aaa1', age:20}, {id:'4', name:'aaa2',age:30}])
   expect(result.current.users).toHaveLength(0)
    })
})