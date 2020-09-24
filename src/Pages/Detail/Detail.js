import React from 'react';
import axios from 'axios';
import {
  Container,
  Jumbotron,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Row, Col
} from 'reactstrap';

class Detail extends React.Component {
  state = {
    detailData: null,
    episodes: null
  }

  async componentDidMount(){
    if(!this.props.location.state || !this.props.location.state.id) {
      this.props.history.replace("/")
      return;
    }else{
      const id = this.props.location.state.id;
      
      // Request Detail Data pake Try Catch
      try {
        const response = await axios({
          method: "GET",
          url: `${process.env.REACT_APP_API_URL}shows/${id}`
        })
        
        if(response.status == 200){
          this.setState({
            detailData: response.data
          })
        }

      }catch (err) {
        console.log(err)
      }

      // Request Episodes pake Promise
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}shows/${id}/episodes`
      })
      .then(response => {
        if(response.status === 200){
          this.setState({
            episodes: response.data
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  onBack = (e) => {
    this.props.history.goBack();
  }

  render(){
    console.log(this.state)
    return(
      <Container>
        <Button color="primary" onClick={this.onBack} className="mb-3 px-5">Back</Button>
        <Jumbotron>
          <img src={this.state.detailData ? this.state.detailData.image.medium : null} />
          <h1>{this.state.detailData ? this.state.detailData.name : null}</h1>
          <p>{this.state.detailData ? this.state.detailData.genres.join(" | ") : null}</p>
          <hr className="my-2" />
          <p>{this.state.detailData ? this.state.detailData.summary : null }</p>
        </Jumbotron>
        <h2> Episodes : </h2>
        <Row>
          {this.state.episodes ? this.state.episodes.map(episode => {
            return(
              <Col md="4" className="mb-3">
                <Card>
                  <CardImg top width="100%" src={episode.image ? episode.image.medium : null} alt="Card image cap" />
                  <CardBody>
                    <CardTitle className="h4">{episode.name}</CardTitle>
                    <CardText>{episode.summary ? episode.summary.substring(0, 50) + "..." : null}</CardText>
                    <a href={episode.url}>Detail</a>
                  </CardBody>
                </Card>
              </Col>
            )
          }) : null}
        </Row>
      </Container>
    )
  }
}

export default Detail;