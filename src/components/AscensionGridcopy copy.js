import React from 'react';
const { createRef, useRef } = React;
import "../styles/global.css";

import BaseAscensionCard from './cards/BaseAscensionCard';
//import WelcomeAscensionCard from './cards/WelcomeAscensionCard';

import { WidthProvider, Responsive } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function AscensionGrid({ gridItems, hass, ...props }) {
  const refs = useRef({})

  const hassStates = Object.keys(hass.states)
  .filter(
    (key, idx) => !hass.states[key].attributes.hidden 
      && hass.states[key].state != 'unavailable'
      && idx < 10
  );

  if (Object.keys(refs.current).length !== hassStates.length) {
    hassStates.forEach((stateEntity, id) => {
      refs.current[id] = refs.current[id] || createRef()
    })
  }

  // useEffect(()=> {
  //   const grid = createGridInstance();
  //   addNewWidget(grid);
  //   return () => {};
  // }, [hassStates]);
  
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

  // function onAddItem() {
  //   this.setState({
  //     // Add a new item. It must have a unique key!
  //     items: this.state.items.concat({
  //       i: "n" + this.state.newCounter,
  //       x: (this.state.items.length * 2) % (this.state.cols || 12),
  //       y: Infinity, // puts it at the bottom
  //       w: 2,
  //       h: 2
  //     }),
  //     // Increment the counter to ensure key is always unique.
  //     newCounter: this.state.newCounter + 1
  //   });
  // }

  // We're using the cols coming back from this to calculate where to add new items.
  // function onBreakpointChange(breakpoint, cols) {
  //   // this.setState({
  //   //   breakpoint: breakpoint,
  //   //   cols: cols
  //   // });
  // }

  // function onLayoutChange(layout) {
  //   props.onLayoutChange(layout);
  //   // this.setState({ layout: layout });
  // }

  return (
    <div id="panel-background">
      <div>
        {/* <button onClick={onAddItem}>Add Item</button> */}
        <ResponsiveReactGridLayout
          // onLayoutChange={onLayoutChange}
          // onBreakpointChange={onBreakpointChange}
          {...props}
        >
          {
            hassStates.map((key, idx) =>
              <div ref={refs.current[idx]} key={idx} className={`grid-stack-item`}>
                <div className="grid-stack-item-content" key={idx} data-grid={{
                  i: idx.toString(), x: idx * 2, y: 0, w: 2, h: 2,
                }}>
                  <WidgetGenerator id={idx} key={key} hass={hass} stateObj={hass.states[key]}/>
                </div>
              </div>
            )
          }
        </ResponsiveReactGridLayout>
      </div>
    </div>
  )
}