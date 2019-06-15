import { Component } from "react";
import InputFormGroup from "../components/InputFormGroup"
import ButtonFormGroup from "../components/ButtonFormGroup"
import SelectFormGroup from "../components/SelectFormGroup"


class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            type: "",
            weapon_type: "",
            vehicle_type: "",
            card_type: "",
            commander_id_for_warrior: "",
            chief_id_for_commander: "",
            getid: "",
            getname: "",
            message: ""
        }
        this.feilds = [
            "id",
            "name",
            "commander_id_for_warrior",
            "chief_id_for_commander"]
        this.selectFields = [
            "type",
            "weapon_type",
            "vehicle_type",
            "card_type",
        ]
        this.handleChange = this.handleChange.bind(this);
    }
    // static async getInitialProps({ req, res }) {
    //     if (req.session.user === 'genericUser') {
    //         console.log("user: ", req.session.user);
    //     }
    // }
    handleChange(event) {
        if (event.target.name === "id") this.setState({ id: event.target.value })
        if (event.target.name === "name") this.setState({ name: event.target.value })
        if (event.target.name === "type") this.setState({ type: event.target.value })
        if (event.target.name === "weapon_type") this.setState({ weapon_type: event.target.value })
        if (event.target.name === "vehicle_type") this.setState({ vehicle_type: event.target.value })
        if (event.target.name === "card_type") this.setState({ card_type: event.target.value })
        if (event.target.name === "commander_id_for_warrior") this.setState({ commander_id_for_warrior: event.target.value })
        if (event.target.name === "chief_id_for_commander") this.setState({ chief_id_for_commander: event.target.value })
        if (event.target.name === "getid") this.setState({ getid: event.target.value })
        if (event.target.name === "getname") this.setState({ getname: event.target.value })
    }

    render() {
        let { weapons, vehicles, member_card, alien_types } = require('../../config/constants')
        return (

            <div>
                <h1>Index</h1>
                <div className="insert-container" >
                    
                    <form id="login-view" className="form" action="http://localhost:4000/insert" name="insert-form" method="POST"  >
                    <h3>Insert New Alien</h3>
                        {this.feilds.map((name) => (
                            <InputFormGroup name={name} vlaue={this.state[name]} handler={this.handleChange} />
                        ))}
                        {this.selectFields.map((name) => {
                            let values
                            if (name === "weapon_type") values = weapons
                            if (name === "vehicle_type") values = vehicles
                            if (name === "card_type") values = member_card
                            if (name === "type") values = alien_types
                            return <SelectFormGroup name={name} types={values} vlaue={this.state[name]} handler={this.handleChange} />
                        })}
                        <ButtonFormGroup value="insert" />

                    </form>


                </div>
                <br />
                <div className="get-container" >
                    <form id="login-view" className="form" action="http://localhost:4000/aliens" name="insert-form" method="GET"  >
                    <h3>Query Supervised Aliens - don't fill anything and press "get" to get all records</h3>

                        <InputFormGroup name="id" vlaue={this.state.id} handler={this.handleChange} />
                        <InputFormGroup name="name" vlaue={this.state.name} handler={this.handleChange} />
                        <ButtonFormGroup value="get" />

                    </form>
                </div>
                <div className="response">{this.state.message}</div>
                <style jsx global>{`
                                    body {
                                    font-family: 'Arial';
                                    }

                                    .insert-container, .get-container {
                                        display: block;

                                    }
                                    form {
                                        margin: auto;
                                        width: 50%;
                                        border: 1px solid #ccc!important;
                                        padding: 10px;
                                    }

                    `}</style>
            </div>
        );
    }
}

export default Index;