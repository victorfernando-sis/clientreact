import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';


import cadastro1 from '../../assets/cadastro1.png';
import { FiXCircle, FiEdit, FiUserX } from 'react-icons/fi';

export default function Student() {

    //  //filtrar dados
    const [searchInput, setSearchInput] = useState('');
    const [filter, setFilter] = useState([]);

    const [students, setStudents] = useState([]);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const searchStudents = (searchValue) => {
        setSearchInput(searchValue);
        if (searchInput !== '') {
            const filtered = students.filter((item) => {
                return Object.values(item).join('').toLowerCase()
                    .includes(searchInput.toLowerCase())
            });
            setFilter(filtered);
        }
        else {
            setFilter(students);
        }
    }

    useEffect(() => {
        api.get('api/students', authorization).then(
            response => {
                setStudents(response.data);
            }, token)
    }, [])

    async function logout() {
        try {
            localStorage.clear();
            localStorage.setItem('token', '');
            authorization.headers = '';
            navigate('/');
        } catch (err) {
            alert('Erro while trying to logout: ' + err);
        }
    }

    async function editStudent(id) {
        try {
            navigate(`new/${id}`);
        } catch (error) {
            alert(`Couldn't find student`)
        }
    }

    async function deleteStudent(id) {
        try {
            if (window.confirm('Would you like to delete id = ' + id + ' ?')) {
                await api.delete(`api/students/${id}`, authorization);
                setStudents(students.filter(student => student.studentId !== id));
            }
        } catch (error) {
            alert('Não foi possível excluir o student')
        }
    }


    return (
        <div className="student-container">
            <header>
                <img src={cadastro1} alt="Registration" />
                <span>Welcome, <strong>{email}</strong>!</span>
                <Link className="button" to="new/0">New Student</Link>

                <button onClick={logout} type="button">
                    <FiXCircle size={35} color="#17202a" />
                </button>
            </header>

            <form>
                <input type='text'
                    placeholder='Filter by name...'
                    onChange={(e) => searchStudents(e.target.value)}
                />
            </form>

            <h1>Students List</h1>
            {searchInput.length > 1 ? (
                <ul>
                    {filter.map(student => (
                        <li key={student.studentId}>
                            <b>Name:</b>{student.name}<br /><br />
                            <b>Email:</b>{student.email}<br /><br />
                            <b>Age:</b>{student.age}<br /><br />
                            <button onClick={() => editStudent(student.studentId)} type="button">
                                <FiEdit size="25" color="#17202a" />
                            </button>
                            <button type="button" onClick={() => deleteStudent(student.studentId)}>
                                <FiUserX size="25" color="#17202a" />
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <ul>
                    {students.map(student => (
                        <li key={student.studentId}>
                            <b>Name:</b>{student.name}<br /><br />
                            <b>Email:</b>{student.email}<br /><br />
                            <b>Age:</b>{student.age}<br /><br />

                            <button onClick={() => editStudent(student.studentId)} type="button">
                                <FiEdit size="25" color="#17202a" />
                            </button>

                            <button type="button" onClick={() => deleteStudent(student.studentId)}>
                                <FiUserX size="25" color="#17202a" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}