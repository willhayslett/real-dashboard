import React from 'react';
const { useState, useEffect, createRef, useRef } = React;
import { GridStack } from 'gridstack';
import 'gridstack/dist/h5/gridstack-dd-native';
import "../styles/global.css";

import BaseAscensionCard from './cards/BaseAscensionCard';
//import WelcomeAscensionCard from './cards/WelcomeAscensionCard';

export default function AscensionGrid({ gridItems, hass }) {
  const refs = useRef({})
  const gridRef = useRef()

  const hassStates = Object.keys(hass.states)
  .filter(
    (key, idx) => !hass.states[key].attributes.hidden 
      && hass.states[key].state != 'unavailable'
      && idx < 10
  );

  // if (Object.keys(refs.current).length !== gridItems.length) {
  //   gridItems.forEach(({ id }) => {
  //     refs.current[id] = refs.current[id] || createRef()
  //   })
  // }

  if (Object.keys(refs.current).length !== hassStates.length) {
    hassStates.forEach((stateEntity, id) => {
      refs.current[id] = refs.current[id] || createRef()
    })
  }

  useEffect(()=> {
    const grid = createGridInstance();
    addNewWidget(grid);
    return () => {};
  }, [hassStates]);

  function createGridInstance() {
    gridRef.current = gridRef.current || GridStack.init({ float: false }, '#dashboard-grid');
    return gridRef.current;
  }
  
  function addNewWidget(grid, event) {
    grid.batchUpdate()
    grid.removeAll(false)
    hassStates.forEach((stateEntity, id) => grid.makeWidget(refs.current[id].current))
    grid.commit();
  };
  
  function WidgetGenerator({id, type, ...props}) {
    console.log(type)
    switch (type) {
      case 'welcome-card':
        return <BaseAscensionCard widgetId={id} {...props}></BaseAscensionCard>;
      case 'simple-light-card':
        return <BaseAscensionCard widgetId={id} {...props}></BaseAscensionCard>;
      case 'advanced-light-card':
        return <BaseAscensionCard widgetId={id} {...props}></BaseAscensionCard>;
      case 'graph-card':
        return <BaseAscensionCard widgetId={id} {...props}></BaseAscensionCard>;
      default:
        return <BaseAscensionCard widgetId={id} {...props}></BaseAscensionCard>;
    }
  }

  return (
    <div id="panel-background">
      <div id="dashboard-grid" className="grid-stack">
        {
          hassStates.map((key, idx) =>
            <div ref={refs.current[idx]} key={idx} className={`grid-stack-item`}>
              <div className="grid-stack-item-content">
                <WidgetGenerator id={idx} key={key} hass={hass} stateObj={hass.states[key]}/>
              </div>
            </div>
          )
        }
        {/* {gridItems.map((item, i) => {
          return (
            <div ref={refs.current[item.id]} key={item.id} className={'grid-stack-item'}>
              <div className="grid-stack-item-content">
                <WidgetGenerator {...item} />
              </div>
            </div>
          )
        })} */}
      </div>
    </div>
  )
}