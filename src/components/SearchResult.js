import React, { Component } from "react";
import API from "../utils/API";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table"
import FormControl from "react-bootstrap/FormControl";

class SearchResult extends Component {
    state = {
        search: "",
        employees: [],
        filteredArray: []
    };

    searchUpdate = (event) => {
        this.setState({ search: event.target.value }, () => {
            this.setState({
                filteredArray: this.state.employees.filter(
                    data => data.name.first.toLowerCase().includes(this.state.search.toLocaleLowerCase())
                )
            })
        })
    };

    getEmployees = () => {
        API.Employee().then(res => this.setState({ employees: res.data.results, filteredArray: res.data.results }))
            .catch(err => console.log(err))
    };

    componentDidMount() {
        this.getEmployees()
    };

    sortAsc() {
        function comparison(a, b) {
            const sortA = a.name.first.toLowerCase();
            const sortB = b.name.first.toLowerCase();
            let compare = 0;

            if (sortA < sortB) {
                compare = 1;
            } else if (sortA > sortB) {
                compare = -1;
            }
            return compare;
        };

        let sortedArr = this.state.filteredArray.sort(comparison);
        this.setState({ filteredArray: sortedArr });
    };


    render() {
        return (
            <div>
                <Form inline>
                    <FormControl type="text" placeholder="Search by first name" className="mr-md-4" value={this.state.search} onChange={this.searchUpdate} />
                    <Button variant="outline-info" onClick={this.sortAsc.bind(this)}>Sort Asc</Button>
                </Form>

                <Table striped bordered hover className="table" >
                    <thead>
                        <tr>
                            <th>Profile Picture</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Cell Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.filteredArray.map(({ login, picture, name, dob, cell }) => {
                                return (
                                    <tr key={login.uuid}>
                                        <th><img src={picture.medium} alt="employee" /></th>
                                        <td>{name.first} {name.last}</td>
                                        <td>{dob.age}</td>
                                        <td>{cell}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        )
    };

};

export default SearchResult;