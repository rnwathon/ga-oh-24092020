import React from 'react';
import axios from 'axios';
import {
  Container,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Row, Col
} from 'reactstrap';

class Home extends React.Component {
  state = {
    tvData: []
  }

  componentDidMount(){
    // Fetch
    // fetch(process.env.REACT_APP_API_URL + "shows?page=1")
    // .then((res) => res.json())
    // .then(res => console.log(res))

    // Axios
    axios({
      method: "GET",
      url: process.env.REACT_APP_API_URL + "shows?page=1",
    })
    .then(response => {
      if(response.status === 200){
        this.setState({
          tvData: response.data
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  onClickDetail = (id) => {
    this.props.history.push({
      pathname: "/detail",
      state: { id }
    })
  }

  render(){
    return(
      <React.Fragment>
        <Container>
          <Row>
            {this.state.tvData.map(data => {
              return(
                <Col md="4" className="mb-3">
                  <Card>
                    <CardImg top width="100%" src={data.image.medium} alt="Card image cap" />
                    <CardBody>
                      <CardTitle className="h4">{data.name}</CardTitle>
                      <CardSubtitle className="text-muted">{data.genres ? data.genres.join(" | ") : null}</CardSubtitle>
                      <CardText>{data.summary.substring(0, 50) + "..."}</CardText>
                      <Button onClick={() => this.onClickDetail(data.id)}>Detail</Button>
                    </CardBody>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default Home;