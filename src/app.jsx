import React, {Component} from 'react';

import Item from './components/Item';

var data;
class App extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    componentWillMount(){
        let XHR = new XMLHttpRequest;
        XHR.open('GET', '/api?id=1', false);
        XHR.send();
        if (XHR.status != 200) {
            console.log( XHR.status + ': ' + XHR.statusText );
        } else {
            this.setState({
                itemData : JSON.parse( XHR.responseText ) ,
            })
        }
    }
    render(){
        return (
            <div>
                <Item itemData={this.state.itemData} />
            </div>
        )
    }
}

export default App;