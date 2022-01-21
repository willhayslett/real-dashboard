import { useState } from 'react';
import Layout from './components/Layout';
import AscensionDrawer from './components/AscensionDrawer';
import AscensionGrid from './components/AscensionGridcopy';


function AscensionDashboard(props) {
  const { hass, panel } = props;
  // const getGridItems = ()=> (
  //   Object.keys(hass.states)
  //     .filter(key => !hass.states[key].attributes.hidden)
  //     .map((key, idx) => (
  //       {
  //         id: idx,
  //         key: key,
  //         hass: hass,
  //         stateObj: hass.states[key],
  //         deleteGridItem: (id) => { deleteItem(id) }
  //       }
  //     ))
  // )

  const getGridItems = () => {
    return panel?.gridConfig?.gridItems || [];
  }
  const [gridItems, manageGridItem] = useState(getGridItems());
  const [drawerOpen, setDrawerOpen] = useState(false);

  const deleteItem = (id) => {
    manageGridItem(gridItems.filter(widget => widget.id !== id));
  }

  const handleGridItem = (e) => {
    const idx = gridItems.length + 1;
    manageGridItem([...gridItems, { i: idx.toString(), x: idx * 2, y: Infinity, w: 2, h: 2, id: idx, deleteGridItem: (id) => { deleteItem(id)} }]);
  }

  return (
    <div className="sl-theme-dark">
      <Layout setDrawerOpen={setDrawerOpen}>
        <AscensionDrawer {...props} open={drawerOpen} setOpen={setDrawerOpen} createGridItem={(e) => { handleGridItem(e) }}/>
        <AscensionGrid {...props} gridItems={gridItems}/>
      </Layout>
    </div>
  );
}

export default AscensionDashboard;