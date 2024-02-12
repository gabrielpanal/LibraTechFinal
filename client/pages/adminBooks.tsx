import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AdminNav from './AdminNav';

interface Book {
  DeweyDec: number;
  ISBN: string;
  Title: string;
  Author: string;
  Publisher: string;
  Genre: string;
  Status: string;
}

function AdminBooks() {

    const[books, setBooks] = useState<Book[]>([])
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        axios.get('https://libra-tech-final-server.vercel.app/allBooks')
        .then(res => setBooks(res.data))
        .catch(err => console.log(err))
    }, [])

  const handleDelete = async (id: any) => {
    const confirmed = window.confirm("Are you sure you want to delete this book?");
    
    if(confirmed){
        try{
            await axios.delete('https://libra-tech-final-server.vercel.app/delete/' + id)
            window.location.reload()
        }catch(err){
            console.log(err);
        }
    }
    
  }

    // Filter books based on the search term
  const filteredBooks = books.filter((book) =>
    book.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );
    
  return (
    <div className='bg-green-100'>
        <AdminNav />
   <section className='d-flex vh-100 justify-content-center align-items-center p-6'>
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search by Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 pr-36 border border-gray-300 rounded m-5"
        />
        <Button className='bg-green-800'>
            <Link href="/AddBook">Add +</Link>
        </Button>
        <div>
            <div>
                <table className='table-fixed'>
                    <thead className="border-b font-medium">
                        <tr 
                        >
                            <th>Dewey Decimal</th>
                            <th>ISBN</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Publisher</th>
                            <th>Genre</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredBooks.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.DeweyDec}</td>
                                    <td>{data.ISBN}</td>
                                    <td>{data.Title}</td>
                                    <td>{data.Author}</td>
                                    <td>{data.Publisher}</td>
                                    <td>{data.Genre}</td>
                                    <td>{data.Status}</td>
                                    <td>
                                        <Button className='bg-green-800'>
                                            <Link href={`/UpdateBook?DeweyDec=${data.DeweyDec}`}>Update</Link>
                                        </Button>
                                        <Button onClick={e => handleDelete(data.DeweyDec)}
                                        className='bg-green-800'>Delete</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</div>
 
  )
}

export default AdminBooks