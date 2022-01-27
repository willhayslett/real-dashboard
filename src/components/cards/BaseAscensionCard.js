import React from 'react';
import styles from './BaseAscensionCard.module.css'

class BaseAscensionCard extends React.Component {
  constructor() {
    super();
    this.name = 'BaseAscensionCard';
    this.isEditMode = true;
    this.deleteCard = this.deleteCard.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }


  getBackground(type, value) {
    switch (type) {
      case 'image':
        return `background-image: url("${__PUBLIC_PATH__}/images/sunnyday.png")`;
      case 'color':
        return `background-color:${value};`;
      default:
        return `#595959`;
    }
  } 

  getEditModeGrid() {
    return (
      <div className={`modal fade`} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-4">.col-md-4</div>
                  <div className="col-md-4 ms-auto">.col-md-4 .ms-auto</div>
                </div>
                <div className="row">
                  <div className="col-md-3 ms-auto">.col-md-3 .ms-auto</div>
                  <div className="col-md-2 ms-auto">.col-md-2 .ms-auto</div>
                </div>
                <div className="row">
                  <div className="col-md-6 ms-auto">.col-md-6 .ms-auto</div>
                </div>
                <div className="row">
                  <div className="col-sm-9">
                    Level 1: .col-sm-9
                    <div className="row">
                      <div className="col-8 col-sm-6">
                        Level 2: .col-8 .col-sm-6
                      </div>
                      <div className="col-4 col-sm-6">
                        Level 2: .col-4 .col-sm-6
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
        </div>
      </div>
    )
  }

  getDeleteModal() {
    return (
      <div className="modal fade" id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className={`modal-content ${styles.deleteModal}`}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Let's Confirm!</h5>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this Widget? It'll be lost forever.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" onClick={this.deleteCard} data-bs-dismiss="modal" className="btn btn-primary">Delete It</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  async deleteCard() {
    this.props.deleteGridItem(this.props.widgetId);
  }

  getEditToolbar() {
    return (
      <sl-dialog label="Dialog" className="dialog-deny-close">
        <div id="toolbar">
          <a data-wysihtml-command="bold">bold</a>
          <a data-wysihtml-command="italic">italic</a>
          <a data-wysihtml-command="formatBlock" data-wysihtml-command-value="h1">H1</a>
          <a data-wysihtml-command="formatBlock" data-wysihtml-command-value="p">P</a>
        </div>
        <sl-button slot="footer" variant="primary">Save &amp; Close</sl-button>
      </sl-dialog>
    )
  }

  handleToggle() {
    const entityId = this.props.stateObj.entity_id;
    const domain = entityId?.substr(0, entityId?.indexOf('.'));
    this.props.hass.callService(domain, 'toggle', {
      entity_id: entityId,
    })
  }

  
  render() {
    console.log(__PUBLIC_PATH__)
    const { stateObj, hass } = this.props;
    const domain = stateObj?.entity_id?.substr(0, stateObj?.entity_id?.indexOf('.'));
    const canToggle = 'toggle' in (hass.services[domain] || {})
    return (
        <>
        <div className={`card`, styles.overlayImg } style={{ backgroundColor: this.getBackground()}}>
          <div className={styles.overlayOpacity }>
            <div className="card-header">
              <div className="">
                <div name="cardOptions" className="dropstart d-none float-end">
                  <i data-bs-toggle="dropdown" aria-expanded="false" className="bi bi-gear" style={{color: '#9A9D9E'}}></i>
                  <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
                    <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop" href="#">Edit Card</a></li>
                    <li><a id="backgroundImageButton" className="dropdown-item" href="#">Change Background</a></li>
                    <li><a id="cardDeleteButton" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#deleteModal" href="#">Delete Card</a></li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-left">Good Evening, {hass.user.name}!</h3>
                <h5 className="text-right">{new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'medium' }).format(new Date())}</h5>
              </div>
            </div>
            <div className="card-body">
              {stateObj?.attributes?.entity_picture &&
              <img alt="" src={stateObj?.attributes?.entity_picture} className="avatar" />}
              <p className="card-text">{stateObj?.name || stateObj?.entity_id}: {stateObj?.state}</p>
              <p className="card-text">This is the card id: {this.props.widgetId}</p>
              {canToggle && <span> <a href="#" className="btn btn-primary">Toggle</a></span>}
            </div>
          </div>
        </div>

        <input className="form-control d-none" type="file" id="backgroundImageInput" accept="image/x-png,image/gif,image/jpeg" />

        {this.getEditModeGrid()}
        {this.getDeleteModal()}
        {this.getEditToolbar()}
      </>
    )
  }
}

export default React.forwardRef((props, ref) => <BaseAscensionCard 
  innerRef={ref} {...props}
/>);