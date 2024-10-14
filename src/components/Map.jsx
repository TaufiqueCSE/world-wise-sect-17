import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
function Map() {
  const navigate=useNavigate();


  return (
    <div className={styles.mapContainer} onClick={()=>navigate('form')}>
      <h1>Map</h1>
      
    </div>
  )
}

export default Map