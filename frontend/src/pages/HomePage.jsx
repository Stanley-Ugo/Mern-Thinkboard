import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import NoteCard from '../components/NoteCard'

const HomePage = () =>
{
    const [isRateLimited, setisRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() =>
    {
        const fetchNotes = async () =>
        {
            try
            {
                const res = await axios.get('http://localhost:5001/api/notes');
                console.log(res.data);
                setNotes(res.data);
                setisRateLimited(false);
            } catch (error)
            {
                console.error('Error fetching notes:', error);
                if (error.response && error.response.status === 429)
                {
                    setisRateLimited(true);
                    toast.error('You have been rate limited. Please try again later.');
                }
                else
                {
                    toast.error('failed to load notes. Please try again later.');
                }
            }
            finally
            {
                setLoading(false);
            }
        }

        fetchNotes();
    }, []);
    return (
        <div className="min-h-screen">
            <Navbar />

            {isRateLimited && <RateLimitedUI />}

            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && <div className="text-center text-primary py-1">Loading Notes...</div>}

                {notes.length > 0 && !isRateLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            notes.map(note =>
                            {
                                <NoteCard key={note._id} note={note} />
                            })
                        }
                    </div>
                )}
            </div>
        </div >
    )
}

export default HomePage
