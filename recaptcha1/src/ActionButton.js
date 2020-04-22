import React from 'react';

class ActionButton extends React.Component {
  render(){ 
    return (
      <div className="actionButton">
        <button 
          className='btn'
          disabled={this.props.disabled}
          onClick={() => this.props.onClick()}
        >
          {this.props.text}
        </button>
      </div>
    );
  }
}

export default ActionButton;