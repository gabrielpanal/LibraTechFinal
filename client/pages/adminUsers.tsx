import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AdminNav from './AdminNav';

interface User {
  StudentID: number;
  LastName: string;
  FirstName: string;
  MidInitial: string;
  Email: string;
  ContactNum: string;
}

function AdminUsers() {
  const[users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
      axios.get('https://libra-tech-final-server.vercel.app/getUsers')
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }, [])

  const handleDelete = async (id: any) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    
    if(confirmed){
        try{
            await axios.delete('https://libra-tech-final-server.vercel.app/deleteUser/' + id)
            window.location.reload()
        }catch(err){
            console.log(err);
        }
    }
  }
    
  const filteredUser = users.filter((user) =>
    user.StudentID.toString().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='bg-green-100'>
        <AdminNav />
   <section className='d-flex vh-100 justify-content-center align-items-center p-6'>
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search by Student ID "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 pr-36 border border-gray-300 rounded m-5"
        />
        <div>
            <div>
                <table className='table-fixed border border-collapse bg-white' style={{ width: '100%', tableLayout: 'fixed' }}>
                    <thead className="border-b font-medium">
                        <tr 
                        >
                            <th className="border p-2">Student ID</th>
                            <th className="border p-2">Last Name</th>
                            <th className="border p-2">First Name</th>
                            <th className="border p-2">Middle Initial</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Contact Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredUser.map((data, i) => (
                                <tr key={i}>
                                    <td className="border p-2">{data.StudentID}</td>
                                    <td className="border p-2">{data.LastName}</td>
                                    <td className="border p-2">{data.FirstName}</td>
                                    <td className="border p-2">{data.MidInitial}</td>
                                    <td className="border p-2">{data.Email}</td>
                                    <td className="border p-2">{data.ContactNum}</td>
                                    <td className="border p-2 text-center">
                                        <Button className='bg-green-800 w-16'>
                                            <Link href={`/UpdateUser?StudentID=${data.StudentID}`}>Update</Link>
                                        </Button>
                                        <Button onClick={e => handleDelete(data.StudentID)}
                                        className='bg-green-800 w-16'>Delete</Button>
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

export default AdminUsers