import styles from '../styles/Home.module.css'
import {useState} from "react";
export default function Result({name, value}:({name:string, value:string})){
    return(
        <div>
          <h2 className={styles.textStrong}>{"Categoria: " + name}</h2>
          <p className={styles.textStrong}>{"Exactitud: " + Number(value).toFixed(5)}</p>
        </div>
    )
}