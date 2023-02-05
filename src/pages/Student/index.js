import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
// import api from '../../services/api';


import cadastro1 from '../../assets/cadastro1.png';
import { FiXCircle, FiEdit, FiUserX } from 'react-icons/fi';

export default function Student() {

    //  //filtrar dados
     const [searchInput,setSearchInput]  = useState('');
     const [filtro, setFiltro] = useState([]);

     const [students, setStudents] = useState([]);

     const email = localStorage.getItem('email');
     const token = localStorage.getItem('token');

    //  const history = useHistory();
   
    //  const authorization = {
    //      headers : {
    //        Authorization : `Bearer ${token}`
    //      }
    //  }

    //  const searchStudents = (searchValue) => {
    //   setSearchInput(searchValue);
    //   if (searchInput !== '') {
    //       const dadosFiltrados = students.filter((item) => {
    //           return Object.values(item).join('').toLowerCase()
    //           .includes(searchInput.toLowerCase())
    //       });
    //       setFiltro(dadosFiltrados);
    //   }
    //   else{
    //       setFiltro(students);
    //   }
    // }

    //  useEffect( ()=> {
    //    api.get('api/students',authorization).then(
    //      response=> {setStudents(response.data);
    //     }, token)
    //  })

     async function logout(){
    //    try{
    //       localStorage.clear();
    //       localStorage.setItem('token','');
    //       authorization.headers ='';
    //       history.push('/'); 
    //    }catch(err){
    //     alert('Não foi possível fazer o logout' + err);
    //    }
     }

     async function editStudent(id){
    //    try{
    //      history.push(`student/new/${id}`);
    //    }catch(error){
    //     alert('Não foi possível editar o student')
    //    }
     }

     async function deleteStudent(id){
    //    try{
    //       if(window.confirm('Deseja deletar o student de id = ' + id + ' ?'))
    //       {
    //             await api.delete(`api/students/${id}`, authorization);
    //             setStudents(students.filter(student => student.id !== id));
    //       }
    //    }catch(error){
    //     alert('Não foi possível excluir o student')
    //    }
     }


    return (
        <div className="student-container">
            <header>
               <img src={cadastro1} alt="Registration" />
               <span>Bem-Vindo, <strong>{'email'}</strong>!</span>
               <Link className="button" to="new/0">Novo Student</Link>

               <button onClick={'logout'} type="button">
                   <FiXCircle size={35}  color="#17202a" />
               </button>
               {/* <a onClick={'logout'}><FiXCircle size={35}  color="#17202a" /> </a> */}
            </header>

            <form>
              <input type='text'
               placeholder='Filtrar por nome...'
                // onChange={(e) => searchStudents(e.target.value)} 
              />
            </form>

            <h1>Relação de Students</h1>
            {searchInput.length > 1 ? (
               <ul> 
               {filtro.map(student => (
                    <li key={student.Id}>
                        <b>Nome:</b>{student.nome}<br/><br/>
                        <b>Email:</b>{student.email}<br/><br/>
                        <b>Idade:</b>{student.idade}<br/><br/>
                        <button onClick={()=> editStudent(student.id)} type="button">
                            <FiEdit size="25" color="#17202a" />
                        </button>
                        <button type="button" onClick= {()=> deleteStudent(student.id)}> 
                            <FiUserX size="25" color="#17202a" />
                        </button>
                    </li>
                ))}
              </ul>
              ) : (
            <ul>
               {students.map(student=>(
                 <li key={student.id}>
                  <b>Nome:</b>{student.nome}<br/><br/>
                  <b>Email:</b>{student.email}<br/><br/>
                  <b>Idade:</b>{student.idade}<br/><br/>

                 <button onClick={()=> editStudent(student.id)} type="button">
                     <FiEdit size="25" color="#17202a" />
                 </button>

                 <button type="button" onClick= {()=> deleteStudent(student.id)}> 
                         <FiUserX size="25" color="#17202a" />
                   </button>
               </li>
                ))}
            </ul>
           )}
        </div>
     );
}