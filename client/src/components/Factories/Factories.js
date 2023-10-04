import React, {useEffect, useState} from "react"
import axios from "axios";
import Plus from '../../img/Plus.svg';
import s from './Factories.module.css'
import FactoriesSettings from "../FactoriesSettings";


const Factories =()=> {
    const [factories, setFactories]=useState([])
    const [status, setStatus]=useState('Table')
    const [id, setId]=useState('')
    const [current, setCurrent]=useState(false)



    useEffect(()=>
    {
        axios.get('http://localhost:4444/').then(
            (res)=> {
                setFactories(res.data)
                console.log(res.data)
            }
        )

    },[current])

    const addNewFactory=()=>{
        setStatus('Add')
    }
    const deleteHandler = (id)=> {
        axios.delete(`http://localhost:4444/factory/${id}`).then(
                (res)=> {
                    if(res.data.success === true){
                        console.log("Запись удалена")
                    } else {
                        console.log("Не удалось удалить запись")
                    }

                }
            ).catch(e=>console.log(e))
        setCurrent(true)
        setTimeout(()=>setCurrent(false),500)
    }
    const editHandler = (id)=> {
        setId(id)
        setStatus('Edit')

    }
    switch (status){
        case 'Table': {
            return <>
                <h1 className={s.headerTitle}>Заводы</h1>
                <button className={s.addFactoryButton} onClick={addNewFactory}>Добавить новый завод
                    <div className={s.imgPlus}>
                        <img  src={Plus} alt="plus"/>

                    </div>
                </button>
                <div className={s.factoriesPane}>
                    {factories.map(el=><div className={s.recordFactory} key={el._id}>
                        <div className={s.recordName}>{el.name}</div>
                        <div className={s.recordIndex}>{el.index}</div>
                        <div className={s.recordHost}>{el.host}</div>
                        <div className={s.recordButtons}>
                            <button className={s.editButton} onClick={()=>editHandler(el._id)}>Изменить</button>
                            <button className={s.deleteButton} onClick={()=>deleteHandler(el._id)}>Удалить</button>
                        </div>
                    </div> )}
                </div>
            </>

        }
        case 'Add': {
            return <FactoriesSettings isNew={true}  setStatus={setStatus}/>
        }
        case 'Edit': {
            return <FactoriesSettings isNew={false}  setStatus={setStatus} id={id}/>
        }
        default: {
            return <h1>Error</h1>
        }
    }

}


export default Factories