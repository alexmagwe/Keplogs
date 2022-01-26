/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import {useRouter} from 'next/router';
import styles from '../styles/Toolbar.module.css'
import logo from '../images/logo.png'
function Toolbar() {
  const router=useRouter()
  return <div className={styles.main}>
  <img onClick={()=>router.push('/')} className={styles.logo} src={logo.src} alt='Keplogs' />
  <div className={styles.navLinks}>
  <div onClick={()=>router.push('/')}>Home</div>
  <div onClick={()=>window.location.href='https://github.com/alexmagwe'}>Github</div>
  <div onClick={()=>window.location.href='https://twitter.com/alexmagwe'}>Twitter</div>
  </div>
  </div>
}

export default Toolbar;
