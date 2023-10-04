import React, {useState} from "react"
import s from './Factories/Factories.module.css'
import axios from "axios";


const FactoriesSettings =(props)=> {
    let [name,setName] =useState('')
    let [index,setIndex] =useState('')
    let [host1,setHost1] =useState('')
    let [host2,setHost2] =useState('')
    let [host3,setHost3] =useState('')
    let [host4,setHost4] =useState('')

    let head
    if (props.isNew) {
        head = 'Добавить завод'
    }
    else {
        head='Редактировать завод'
    }
    const saveData =()=>{
        if (host1!=='' && host2!=='' && host3!=='' && host4!=='' && name!=='' && index!==''){

            if (props.isNew) {
                axios.post('http://localhost:4444/factory',{
                    name: name,
                    index: index,
                    host: String(host1)+'.'+String(host2)+'.'+String(host3)+'.'+String(host4)
                }).then(
                    (res)=> {
                        if(res.data.success === true){
                            console.log("Данные записались")
                        } else {
                            console.log("Данные не записались")
                        }

                    }
                ).catch(e=>console.log(e))

            }
            else {

                axios.patch(`http://localhost:4444/factory/${props.id}`,{
                    name: name,
                    index: index,
                    host: String(host1)+'.'+String(host2)+'.'+String(host3)+'.'+String(host4)
                }).then(
                    (res)=> {
                        if(res.data.success === true){
                            console.log("Данные отредактированы")
                        } else {
                            console.log("Данные не отредактированы")
                        }

                    }
                ).catch(e=>console.log(e))

            }
        }



    }



    return <>

        <form className={s.mainForm}>
            <div>
                <h1 className={s.headerTitle}>{head}</h1>
                <div className={s.panel}>

                    <label>Индекс</label>
                    <input className={s.bigInput} type="text" onChange={event => setIndex(event.target.value)}/>
                    <label>Наименование</label>
                    <input className={s.bigInput} type="text" onChange={event => setName(event.target.value)}/>
                    <label>Хост</label>
                    <div className={s.hostInputs}>
                        <input type="number"  placeholder={"IP"}  onChange={event => setHost1(event.target.value)}/>
                        <label>.</label>
                        <input type="number"  onChange={event => setHost2(event.target.value)} />
                        <label>.</label>
                        <input type="number"  onChange={event => setHost3(event.target.value)}/>
                        <label>.</label>
                        <input type="number" onChange={event => setHost4(event.target.value)}/>
                    </div>
                </div>
            </div>


            <div className={s.footer}>
                <input type="button" className={s.cancelButton} value={"Отмена"} onClick={()=>props.setStatus('Table')}/>
                <input type="submit" className={s.saveButton} value={"Сохранить"} onClick={saveData}/>
            </div>
        </form>

    </>
}


export default FactoriesSettings