import { useEffect } from "react";
import Cookies from 'js-cookie'
const Bookshelves = () => {
    const getBooksData = async () => {
        const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
        const jwtToken = Cookies.get('jwt_token')
        const options = {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
        }
        const response = await fetch(url, options)
        console.log(response)
        const data = await response.json()
        console.log(data)
    }
    useEffect( () => {
        getBooksData();
        
    })

}

export default Bookshelves;