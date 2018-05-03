import React, { Component } from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux'

class Feature extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentWillMount() {
        this.props.fetchMessage();
    }

    showMessage() {
        if (this.props.message) {
            return (
                <div>this.props.message</div>
            )
        }
    }

    render() { 
        return ( 
            <div>
                Feature, { this.props.message }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { message: state.auth.message }
}
 
export default connect(mapStateToProps, actions)(Feature);