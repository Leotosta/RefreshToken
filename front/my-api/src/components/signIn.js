import React, { useContext, useCallback } from 'react'
import  {useForm}  from 'react-hook-form'
import api from '../api'
import history from '../history'
import Context from '../stores/store'
import { setToken } from '../storage'


function SignIn() {
    
    const { register, handleSubmit } = useForm()
    const { auth, setAuth } = useContext(Context)


    const onSubmit = async useCallback(dados){
        try{
           
            const {data: {token}} = await api.post('/SignIn', dados)
            
            if(!token)
                return new Error('Invalid section!')
            
            setToken(token)

            history.push('/refreshToken')

        }catch(e){
            if(e.response)
                console.log(e.response.data)
        }
    }
  

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label> Username </label>
                <input type="text" defaultValue="leotosta11" name="username" ref={register} />
            </div>

            <div>
                <label> Password </label>
                <input type="password" defaultValue="123456" name="password" ref={register} />
            </div>

            <button > Submit </button>

        </form>
    )
}

export default SignIn