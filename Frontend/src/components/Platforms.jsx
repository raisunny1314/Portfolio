import React from 'react'
import api from '../services/api'
import { useState, useEffect } from 'react'
import SocialCards from './SocialCards'

const Platforms = () => {
    const [socials, setSocials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        api.get('/codingprofile').then((res) => {
            console.log(res.data);
            setSocials(res.data.data);
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            setErr(" Failed to Load ");
        })
    },[])

    if (loading) return <p className="text-white">Loading...</p>;
    if (err) return <p className="text-white">{err}</p>

    return (
        <div className="grid gap-6 md:grid-cols-3 pt-5 max-w-6xl mx-auto">
         {
            socials.map((social)=>(
                <SocialCards key={social._id}   social ={social} />
            ))
         }
        </div>
    )
}

export default Platforms
