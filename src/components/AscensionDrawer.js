import { SlButton, SlDrawer } from '@shoelace-style/shoelace/dist/react'
//import cardTypes from './cards/cardTypes.js';
import styles from './AscensionDrawer.module.css'
const cardTypes = [
  {
    cardName: 'Welcome Card', cardType: 'welcome-card', 
    cardDescription: 'Beautiful intro card. Background images cycle based on time of day. Includes hooks for weather and time'
  },
  {
    cardName: 'Simple Light Toggle Card', cardType: 'simple-light-card', 
    cardDescription: 'Toggles a light entity on/off.'
  },
  {
    cardName: 'Advanced Light Card', cardType: 'advanced-light-card', 
    cardDescription: 'Light entity toggle with color and temperature pickers.'
  },
  {
    cardName: 'Thermostat Card', cardType: 'thermostat-card', 
    cardDescription: 'Allows configuring and updating thermostat entities.'
  },
  {
    cardName: 'Weather Card', cardType: 'weather-card', 
    cardDescription: 'Displays weather entity data.'
  },
]

export default function AscensionDrawer({ open, setOpen, createGridItem }) {
  return (
    <>
      <SlDrawer label="Drawer" placement="top" open={open} onSlAfterHide={() => setOpen(false)} style={{ '--size': '50vw' }}>
        <div>
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {cardTypes.map(({ cardName, cardType, cardDescription }) => {
              return (
                <div className="col">
                  <div className={`card h-100 ${styles.card} shadow p-3 mb-5 bg-body rounded`}>
                    <div className="card-body">
                      <h5 className="card-title">{ cardName }</h5>
                      <p className="card-text">{ cardDescription }</p>
                      <a href="#" data-card-type={cardType} onClick={ (e) => { createGridItem(e); setOpen(false)} } className="stretched-link add-widget-card"></a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <SlButton slot="footer" variant="primary" onClick={() => setOpen(false)}>
          Close
        </SlButton>
      </SlDrawer>
    </>
  )
}