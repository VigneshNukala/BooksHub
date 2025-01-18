import Cookies from 'js-cookie'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import loginlogo from '../../images/loginlogo.png'
import loginpic from '../../images/loginpic.png'

import './index.css'

const Login = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState(false)
    const [errMsg, setErrmsg] = useState('')

    const  navigate = useNavigate()

    const onSubmitSuccess = (jwtToken) => {
        Cookies.set('jwt_token', jwtToken, {
            expires: 30,
            path: '/',
          })
          navigate('/')
    }

    const onSubmitFailure = () => {
        setStatus(true)
        setErrmsg(errMsg)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const userDetails = { name, password }
        const url = 'https://apis.ccbp.in/login'
        const options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
        }
        

        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        if (response.ok === true) {
            onSubmitSuccess(data.jwt_token)
        }else {
            onSubmitFailure(data.error_msg)
        }

    }
    
    const onChangeName = (event) => {
        setName(event.target.value)
    }
    
    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    return (
        <div className='h-screen w-screen flex flex-row'>
            <img className="w-[50vw]" src={loginpic} alt="login pic"/>
            <div className='w-full flex flex-row justify-center items-center bg-[#F5F7FA]'>
                <form className='w-1/2 p-10 flex flex-col justify-between rounded bg-white' onSubmit={handleSubmit}>
                    <img className="h-11 w-36 self-center" src={loginlogo} alt="login logo" />
                    <label className='my-5 text-[#5A7184] font-semibold text-lg'>Username*</label>
                    <input type='text' className='p-2 border-2 rounded text-base text-[#183B56] font-semibold' placeholder='Enter Username' value={name} onChange={onChangeName}/>
                    <label className='my-4 text-[#5A7184] font-semibold text-lg'>Password*</label>
                    <input type='password' className='p-2 border-2 rounded text-base text-[#183B56] font-semibold' placeholder='Enter Password' value={password} onChange={onChangePassword}/>
                    {status ? <p className='text-red-700 text-sm '>{errMsg}</p> : ''}
                    <button className="mt-10 bg-[#0284C7] p-2 text-white border-none rounded text-lg font-semibold" type="submit">Login</button>
                </form>
            </div>    
        </div>
        )
}

export default Login;