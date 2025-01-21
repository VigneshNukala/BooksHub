import Cookies from 'js-cookie'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import loginlogo from '../../images/loginlogo.png'
import loginpic from '../../images/loginpic.png'

import './index.css'

const Login = () => {
    const [username, setUsername] = useState('')
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

    const onSubmitFailure = errorMsg => {
        setStatus(true)
        setErrmsg(errorMsg)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const userDetails = { username, password }
        const url = 'http://localhost:3001/login'
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDetails),
        }
        
        const response = await fetch(url, options)
        const data = await response.json()
        
        if (response.ok === true) {
            onSubmitSuccess(data.jwtToken)
        }else {

            onSubmitFailure(data)
        }

    }
    
    const onChangeName = (event) => {
        setUsername(event.target.value)
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
                    <input type='text' className='p-2 border-2 rounded text-base text-[#183B56] font-semibold' placeholder='Enter Username' value={username} onChange={onChangeName}/>
                    <label className='my-4 text-[#5A7184] font-semibold text-lg'>Password*</label>
                    <input type='password' className='p-2 border-2 rounded text-base text-[#183B56] font-semibold' placeholder='Enter Password' value={password} onChange={onChangePassword}/>
                    {status && <p className='text-red-500 text-sm font-semibold'>{errMsg}</p>}
                    <button className="mt-10 bg-[#0284C7] p-2 text-white border-none rounded text-lg font-semibold" type="submit">Login</button>
                </form>
            </div>    
        </div>
        )
}

export default Login;