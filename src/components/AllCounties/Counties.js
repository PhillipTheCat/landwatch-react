import React from "react";
import {Link} from "react-router-dom";
import './Counties.css'

class Counties extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            counties: []
        }
    }

componentDidMount() {
    this.getCounties()
}

getCounties = () => {
    fetch("http://localhost:3001/counties")
    .then(res => res.json())
    .then(
      (result) => {
            console.log(result)
            this.setState({
                counties: result
            })
        }
    )
}



render() {
    const items = this.state.counties.map((item) =>
    <div>
        <Link to={{pathname: item.COUNTY,  state: {name: item.COUNTY}}} className="county-name"> {item.COUNTY}</Link>
    </div>
    );

    return (
        <div>
            <a>{items}</a>
        </div>
    );
}
}
export default Counties