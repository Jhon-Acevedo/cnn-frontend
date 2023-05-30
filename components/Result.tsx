import styles from '../styles/Home.module.css'
import {useState} from "react";
export default function Result({name, value}:({name:string, value:string})){
    return(
        <div className={styles.box}>
          <h2 className={styles.textStrong}>{"Prediction: " + name}</h2>
          <p className={styles.textStrong}>{"Value: " + Number(value).toFixed(8)}</p>
        </div>
    )
}