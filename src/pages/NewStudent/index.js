import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiCornerDownLeft, FiUserPlus } from 'react-icons/fi';
import api from '../../services/api';

export default function NewStudent() {

   const [id, setId] = useState(null);
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [age, setAge] = useState(0);

   const { studentId } = useParams();
   const navigate = useNavigate();

   const token = localStorage.getItem('token');
   const authorization = {
      headers: {
         Authorization: `Bearer ${token}`
      }
   }

   useEffect(() => {
      if (studentId === '0')
         return;
      else
         loadStudent();
   }, [])

   async function loadStudent() {
      try {

         const response = await api.get(`api/students/${studentId}`, authorization);

         setId(response.data.studentId);
         setName(response.data.name);
         setEmail(response.data.email);
         setAge(response.data.age);
      } catch (error) {
         alert('Error while retriving student ' + error);
         navigate('students');
      }
   }

   async function saveOrUpdate(event) {
      event.preventDefault();

      const data = {
         name,
         email,
         age
      }

      try {
         if (studentId === '0') {
            await api.post('api/students', data, authorization);
         }
         else {
            data.studentId = id;
            await api.put(`api/students/${id}`, data, authorization)
         }
      } catch (error) {
         alert('Error saving student ' + error);
      }
      navigate('/students');
   }

   return (
      <div className="new-student-container">
         <div className="content">
            <section className="form"><FiUserPlus size="105" color="#17202a" />
               <h1>{studentId === '0' ? 'Add New Student' : 'Update Student'}</h1>
               <Link className="back-link" to="/students">
                  <FiCornerDownLeft size="25" color="#17202a" /> Go back
               </Link>
            </section>

            <form onSubmit={saveOrUpdate}>
               <input placeholder="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
               />
               <input placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
               />
               <input placeholder="Age"
                  value={age}
                  onChange={e => setAge(e.target.value)}
               />
               <button className="button" type="submit">{studentId === '0' ? 'Add ' : 'Update '}</button>
            </form>

         </div>
      </div>
   );
}