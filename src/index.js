import 'bootstrap/dist/js/bootstrap.js';
import AscensionPanelElement from './AscensionElement';
import AscensionDashboard from './AscensionDashboard';
import Panel from './components/Panel'


// ReactDOM.render(
//   <div className="sl-theme-dark">
//     < AscensionDashboard /> 
//   </div>, 
//   document.getElementById('root')
// );

customElements.define('ascension-dashboard', AscensionPanelElement(AscensionDashboard));