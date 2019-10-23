import React, { Component } from 'react';
import axios from 'axios'

const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'react'

const MyTable = props => {
  return (
    <div> 
        <h1 style={{textAlign: "center"}}> Data from:  {API+DEFAULT_QUERY}</h1>
      <table border="1" style={{width: "100%"}}>
        {props.hits.map(hit =>
          <tr > 
            <td>{hit.objectID}</td>
            <td><a href={hit.url}>{hit.title}</a></td>
          </tr>
        )}
      </table>
      </div>
  )
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      isLoading: false
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(API + DEFAULT_QUERY)
      .then(response => response.json())
      .then(data => this.setState({ hits: data.hits, isLoading: false }));

      // axios.get(API + DEFAULT_QUERY)
      // .then(res => {
      //   const data = res.data;
      //   this.setState({ hits: data.hits, isLoading: false });
      // })
  }
  render() {
    const { hits, isLoading } = this.state;
    if (isLoading) {
      return <h1 style={{textAlign: "center", fontSize: "10em", color: "red"}}>Loading ...</h1>;
    }

    return (
      <MyTable hits={hits}/>
    );
  }
}
export default App;