import React, { Component } from 'react';

class Table extends Component {
  render() {
    const body = this.props.data.map(x => (
      <tr key={x.name}>
        <td>{x.name}</td>
        <td>{x.age}</td>
      </tr>
    ));

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {body}
        </tbody>
      </table>
    );
  }
}

export default Table;
